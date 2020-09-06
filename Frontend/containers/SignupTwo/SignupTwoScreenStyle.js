import { StyleSheet } from "react-native";
import { Helpers, Metrics, Fonts, Colors } from "../../themes";
export default StyleSheet.create({
  container1: {
    backgroundColor: "white",
    marginTop: 40,
    marginBottom: "10%",
    marginLeft: 18,
    marginRight: 18,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  containerBox: {
    marginRight: "20%",
    marginLeft: "13.5%",
    position: "relative",
    top: "-4.5%",
    backgroundColor: "rgba(38,153,251,0.6)",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(38,153,251,0.1)",
    width: "72%",
    height: "19.5%",
  },
  loginBox: {
    fontSize: 23,
    marginTop: 20,
    color: "white",
    textAlign: "center",
  },
  picOption: {
    flex: 2,
    marginTop: "-6%",
    marginLeft: "3%",
    marginRight: "-3%",
  },
  textInput: {
    ...Fonts.normal,
    height: 50,
    backgroundColor: "rgb(235, 233, 233)",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(38,153,251,1)",
    marginHorizontal: 40,
    marginBottom: 20,
    color: "rgba(38,153,251,1)",
    paddingHorizontal: 10,
  },
  picOption1: {
    marginTop: -30,
    marginLeft: -222,
    color: "rgba(38,153,251,1)",
  },
  picOption2: {
    marginTop: -37.5,
    marginLeft: 200,
    width: 160,
    color: "rgba(38,153,251,1)",
    marginRight: "80%",
    marginBottom: "18%",
  },

  button: {
    alignSelf: "center",
    ...Fonts.small,
    margin: 10,
    marginTop: "-9%",
    marginBottom: "14%",
  },

  imageContainer: {
    position: "relative",
    top: "-7.5%",
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 0.2,
    borderColor: "#BEBEBE",
    // backgroundColor: "#BEBEBE",
  },
  camera: {
    position: "relative",
    top: "-45%",
    left: "25%",
    width: 20,
    height: 20,
  },

  image: {
    position: "relative",
    top: "-1%",
    width: 130,
    height: 130,
    alignSelf: "center",

    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 0.2,
    borderColor: "#BEBEBE",
    // backgroundColor: "#BEBEBE",
  },
  login: {
    width: 550,
    position: "relative",
    top: 145,
    height: 60,
    alignSelf: "center",
    backgroundColor: "rgba(188, 224, 253, 1)",
    borderWidth: 0.5,
    paddingTop: 10,
    ...Fonts.normal,
    paddingBottom: 10,
    margin: 10,
    borderColor: "rgba(38,153,251,1)",
  },
  account: {
    ...Fonts.small,
    color: "black",
    position: "relative",
    top: 140,
  },
  arrow: {
    width: 30,
    height: 40,
    position: "relative",
    top: -50,
    left: 15,
  },
  city: {
    position: "relative",
    top: "-9.3%",
    left: "84.5%",
    width: "8%",
    height: "3.7%",
  },
  state: {
    position: "relative",
    top: "-9.3%",
    left: "85%",
    width: "8.7%",
    height: "3.8%",
  },
  zip: {
    position: "relative",
    top: "-10%",
    left: "86%",
    width: "7.7%",
    height: "4.3%",
  },
  description: {
    position: "relative",
    top: "-9.6%",
    left: "85.5%",
    width: "8.7%",
    height: "4.3%",
  },
  validators: {
    marginLeft: 30,
    color: "#BEBEBE",
    position: "relative",
    top: "-7.6%",
  },
  textInput: {
    height: 20,
    marginTop: 6,
    marginLeft: 0,
    color: "#BEBEBE",
    marginLeft: 30,
    marginRight: 30,
    borderColor: "#BEBEBE",
    letterSpacing: 1,
    textAlign: "left",
    fontSize: 16,
    borderBottomWidth: 1,
    width: "85%",
    marginBottom: 30,
  },
});
