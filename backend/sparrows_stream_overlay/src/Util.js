class SVGUtil {
    static arrayToPointString(pointsAsArray){
        let pointStr = "";
        if(!(pointsAsArray.length % 2 === 0)){
            console.error("ArraySize not modulo 2")
            return pointStr;
        }
        var i;
        for(i = 0; i < pointsAsArray.length; i+=2){
            pointStr += pointsAsArray[i] + "," + pointsAsArray[i+1] + " ";
        }
        console.log(pointStr)
        return pointStr;
    }
}

export default SVGUtil;