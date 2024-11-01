import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client";

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages
export default function Mascot(props) {
  const [mascot, setMascot] = useState({ name: "", slogan: "", img: "" });
  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot", {
      headers: {
        "X-CS571-ID":
          "bid_5441f11ab5801d6259ce4cc6c0bf77c42a3c39a6daac9e23094ae52a588b48ee",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMascot({ name: data.name, slogan: data.quote, img: data.imgSrc });
      });
  }, []);

  function handlePress() {
    fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages", {
      headers: {
        "X-CS571-ID":
          "bid_5441f11ab5801d6259ce4cc6c0bf77c42a3c39a6daac9e23094ae52a588b48ee",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Message Recieved!", data.msg);
      });

    alert();
  }

  return (
    <Pressable onPress={handlePress}>
      <Image style={{ width: 200, height: 200 }} source={{ uri: mascot.img }} />
      <Text style={{ fontSize: 36 }}>{mascot.name}</Text>
      <Text style={{ fontSize: 18 }}>{mascot.slogan}</Text>
    </Pressable>
  );
}
