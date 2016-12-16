import paho.mqtt.client as mqtt
import json
import os
import urllib.request

deviceId = "5853fa7b7517dd5757872c40"

def printFile(payload):
    queue = json.loads(str(payload, "utf-8"))
    print("Printing " + queue["file"])
    if queue["file"].endswith("docx") or queue["file"].endswith("pdf"):
        req = urllib.request.urlretrieve(queue["file"].replace("http://localhost:3001/", "https://fliped.xyz/"), queue["file"].rsplit("/", 1)[-1])
        os.startfile(queue["file"].rsplit("/", 1)[-1], "print")

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("printat/" + deviceId + "/#")

def on_message(client, userdata, msg):
    if (msg.topic.startswith("printat/" + deviceId + "/queue")):
        print("Queuing Requested.", msg.payload)
        printFile(msg.payload)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("fliped.xyz")

client.loop_forever()
