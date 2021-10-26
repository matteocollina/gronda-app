import { Dimensions, StyleSheet } from "react-native";
import { BORDER_RADIUS, PRIMARY_COLOR } from "../../assets/consts";

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const MARGIN = 10;

export default style = StyleSheet.create({
    containerFilters: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20, 
      },
    containerCarousel: {flex: 2, marginBottom: 30},
    itemContainer: {
      width: size - MARGIN * 2,
      height: size + 60,
      marginBottom: 15,
    },
    item: {
      backgroundColor: 'transparent',
    },
    container: {
      marginRight: 10,
      marginLeft: 10,
    },
    titleSection: {fontWeight: 'bold', fontSize: 23, marginBottom: 20, color:"black"},
    cardImg: {
        width: '100%',
        height: 200,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
      },
    titleCard: {fontSize: 16, fontWeight: '600', marginTop: 8, color:"black"},
    subtitleCard: {fontSize: 14, marginTop: 10}
  });