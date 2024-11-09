import qrcode
url = "https://192.168.1.64:8080"
qr = qrcode.make(url)
qr.save("qrcode.png")