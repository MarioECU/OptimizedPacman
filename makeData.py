import numpy as np
x = np.linspace(0.01, 20, 1000)
y = 2 * x + 18 / x
data = open("data.csv", "w")
data.write("x,y\n")
for i in range(len(x)):
    cadena = str(round(x[i], 4)) + "," + str(round(y[i], 4)) + "\n"
    data.write(cadena)
