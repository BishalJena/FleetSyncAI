from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login


login(token=" ")

model_name = "EleutherAI/gpt-j-6B"
model = AutoModelForCausalLM.from_pretrained(model_name, use_auth_token=True)
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=True)

model.save_pretrained(" ")
tokenizer.save_pretrained(" ")
