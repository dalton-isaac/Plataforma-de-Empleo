"""
init_db.py
──────────
Punto de entrada de retrocompatibilidad para inicializar la base de datos.
El script canónico se encuentra en database/init_db.py.
"""
import os
import sys

if __name__ == "__main__":
    script_path = os.path.join(os.path.dirname(__file__), "database", "init_db.py")
    with open(script_path, "r", encoding="utf-8") as f:
        code = compile(f.read(), script_path, "exec")
        exec(code, {"__name__": "__main__", "__file__": script_path})
