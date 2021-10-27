import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../assets/consts";

export default style = StyleSheet.create({
    container: { display:"flex",flex: 1, justifyContent: 'center', alignItems: 'center' },
    containerImg:{flex:1,width:"100%",backgroundColor:PRIMARY_COLOR,justifyContent: 'center', alignItems: 'center'},
    placeholderImg: {position:"absolute", maxWidth:"20%", height:"100%", tintColor:"rgba(255,255,255,0.3)"},
    containerText: {flex:1, display:"flex", alignItems:"flex-start", width:"100%"},
    text: {marginTop:30, fontWeight:"bold", fontSize:20, marginLeft:20, color:"black"}
})