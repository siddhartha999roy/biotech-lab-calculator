import streamlit as st

st.title("Biotech Lab Helper 🧬")

# Molarity Calculator Section
st.header("1. Molarity Calculator")
molarity = st.number_input("Desired Molarity (M)", value=0.1)
volume = st.number_input("Volume (Liters)", value=1.0)
mw = st.number_input("Molecular Weight (g/mol)", value=58.44)  # Default: NaCl

if st.button("Calculate Mass"):
    mass = molarity * volume * mw
    st.success(f"Required Mass: {mass:.4f} grams")
