import { StyleSheet } from "react-native";
import { BORDER_RADIUS, PRIMARY_COLOR } from "../../assets/consts";

export default style = StyleSheet.create({
    image:{
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS,
        position: 'relative',
        overflow: 'hidden',
      },
      activeDot:{
        backgroundColor: 'white',
        width: 8,
        height: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 4,
      },
      dotStyle:{
        backgroundColor: 'rgba(255,255,255,.5)',
        width: 8,
        height: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 4,
      },
      containerSlide:{
        flex: 1,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      overlayCard:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      containerText:{
        position: 'absolute',
        backgroundColor: 'transparent',
        top: '10%',
        left: 15,
        height: '80%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
      },
      category:{fontWeight: 'bold', color: '#FFAE50'},
      title:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
      },
      subtitle:{fontWeight: '600', color: 'white'}
})