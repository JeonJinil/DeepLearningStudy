var map;
var mapW, mapH;     // 지도의 가로, 세로 크기(Pixel단위) 를 지정 합니다.
var cLonLat, zoom;      //중심 좌표와 지도레벨을 정의 합니다.

function setVariables(){
    cLonLat = new Tmap.LonLat(14135912.880612050, 4518334.160091842);
    //중심점 좌표 입니다. EPSG3857 좌표계 형식 입니다.
    zoom = 16;  // zoom level입니다.  0~19 레벨을 서비스 하고 있습니다.
    mapW = '500px';  // 지도의 가로 크기 입니다.
    mapH = '400px';  // 지도의 세로 크기 입니다.
}

function init() {
    setVariables();
    map = new Tmap.Map({div:'map_div', width:mapW, height:mapH, animation:true});
    // div : 지도가 생성될 div의 id값과 같은 값을 옵션으로 정의 합니다.
    // Tmap,Map 클래스에 대한 상세 사항은 "JavaScript" 하위메뉴인 "기본 기능" 페이지를 참조 해주세요.

    map.setCenter(cLonLat,zoom);
}




function whereami(elt,$lat,$log) {
    // 이 객체를 getCurrentPosition() 메서드의 세번째 인자로 전달한다.
    var options = {
        // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
        // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다.
        enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값

        // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자,
        // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
        maximumAge: 30000,     // 5분이 지나기 전까지는 수정되지 않아도 됨

        // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
        // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
        timeout: 15000    // 15초 이상 기다리지 않는다.
    }

    if(navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다.
        navigator.geolocation.getCurrentPosition(success, error, options);
    else
        elt.innerHTML = "이 브라우저에서는 Geolocation이 지원되지 않습니다.";

    // geolocation 요청이 실패하면 이 함수를 호출한다.
    function error(e) {
        // 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
        // 코드 값은 다음과 같다.
        // 1: 사용자가 위치 정보를 공유 권한을 제공하지 않음.
        // 2: 브라우저가 위치를 가져올 수 없음.
        // 3: 타임아웃이 발생됨.
        elt.innerHTML = "Geolocation 오류 "+e.code +": " + e.message;
    }


    // geolocation 요청이 성공하면 이 함수가 호출된다.
    function success(pos) {

        console.log(pos); // [디버깅] Position 객체 내용 확인
        $lat.val(pos.coords.latitude);
        $log.val(pos.coords.longitude);
        // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고,
        // 외부에서 가져오는 필드라는 점에 주의하다.
        var msg =
            // new Date(pos.timestamp).toLocaleString() + "에 " +
            " 위도 " + pos.coords.latitude +
            " / " +
            " 경도 " + pos.coords.longitude +
            " 정확 :  " + pos.coords.accuracy;

        // // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
        // if(pos.coords.altitude) {
        //     msg += " 당신은 해발 " + pos.coords.altitude + " ± " +
        //         pos.coords.altitudeAccuracy + " 미터에 있습니다.";
        // }
        //
        // // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
        // if(pos.coords.speed) {
        //     msg += " 당신은 " + pos.coords.heading + " 방향으로 " +
        //         "초속 " + pos.coords.speed + "(m/s)의 속도로 움직이고 있습니다.";
        // }

        elt.innerHTML = msg;     // 모든 위치 정보를 출력한다.
    }
}
