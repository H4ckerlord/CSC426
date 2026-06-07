import tkinter as tk
import math

def click(val):
    if val == "C":
        entry_var.set("")
    elif val == "=":
        try:
            result = eval(entry_var.get().replace("^", "**").replace("\\", "/"))
            entry_var.set(result)
        except:
            entry_var.set("Error")
    else:
        entry_var.set(entry_var.get() + val)

root = tk.Tk()
root.title("CSC426 Calculator")
root.geometry("300x400")

entry_var = tk.StringVar()
entry = tk.Entry(root, textvariable=entry_var, font=("Arial", 20), justify="right")
entry.pack(fill="both", padx=10, pady=10)

buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "^", "%", "\\", "C"
]

frame = tk.Frame(root)
frame.pack()

for i, btn in enumerate(buttons):
    row, col = i // 4, i % 4
    action = lambda x=btn: click(x)
    tk.Button(frame, text=btn, font=("Arial", 14), width=5, command=action).grid(row=row, column=col, padx=2, pady=2)

root.mainloop()