import pinecone
from sentence_transformers import SentenceTransformer
from backend.vector_database.config import Config
from backend.vector_database.database import get_db_connection

pinecone.init(api_key=Config.PINECONE_API_KEY, environment=Config.PINECONE_ENVIRONMENT)
index_name = "booking_index"

if index_name not in pinecone.list_indexes():
    pinecone.create_index(index_name, dimension=384)

index = pinecone.Index(index_name)
model = SentenceTransformer('all-MiniLM-L6-v2')


def generate_booking_text(booking_id):
    db = get_db_connection()
    cursor = db.cursor()
    query = """
    SELECT b.booking_id, b.booking_date, b.delivery_date, b.isCompleted, 
           p.source, p.destination, b.payload, t.truck_id
    FROM booking b
    JOIN path p ON b.path_id = p.path_id
    JOIN truck t ON b.truck_id = t.truck_id
    WHERE b.booking_id = %s
    """
    cursor.execute(query, (booking_id,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    if result:
        return f"Booking {result[0]}: From {result[4]} to {result[5]}, Booked on {result[1]}, Delivery on {result[2]}, Status: {'Completed' if result[3] else 'Pending'}, Payload: {result[6]}, Truck: {result[7]}"
    return None


def update_vector_db(booking_id):
    booking_text = generate_booking_text(booking_id)
    if booking_text:
        embedding = model.encode(booking_text).tolist()
        index.upsert([(str(booking_id), embedding)])


def query_vector_db(truck_owner_id, query_text):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT truck_id FROM truck WHERE truck_owner_id = %s", (truck_owner_id,))
    truck_ids = [row[0] for row in cursor.fetchall()]
    cursor.close()
    db.close()

    query_embedding = model.encode(query_text).tolist()
    results = index.query(query_embedding, top_k=10, include_metadata=True)
    filtered_results = [r for r in results.matches if r.id in map(str, truck_ids)]

    return filtered_results
