const map = new ol.Map({
    target: 'map1',    //지도영역 div의 id입력
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),    //Open Street Map
        })
    ],
    view: new ol.View({    //지도의 어느 부분을 보여줄 것인지 설정
        // center: [0, 0],
        // zoom: 2,
        center: ol.proj.fromLonLat([127.00169, 37.56421]),    //중심좌표 지도에 맞는 좌표계로 변환
        zoom: 10,
    }),
});


// 지도 줌인/줌아웃 메소드
//줌인 애니메이션 효과 코드
const handleZoomInClick = () => {
    const zoom = map.getView().getZoom() + 2;
    map.getView().animate({
        zoom,
        duration: 500
    });
};

//줌인 애니메이션 효과 없는 코드
// const handleZoomInClick = () => {
//     const zoom = map.getView().getZoom() + 1;
//     map.getView().setZoom(zoom);
// };

//줌아웃 애니메이션 효과 코드
const handleZoomOutClick = () => {
    const zoom = map.getView().getZoom() - 2;
    map.getView().animate({
        zoom,
        duration: 500
    });
};

//줌아웃 애니메이션 효과 없는 코드
// const handleZoomOutClick = () => {
//     const zoom = map.getView().getZoom() - 1;
//     map.getView().setZoom(zoom);
// };


// 지도 지정된 좌표로 리셋
// const center = fromLonLat[127.00169, 37.56421];
// const center = Point([127.00169, 37.56421]);

var pnt = new ol.geom.Point([127.00169, 37.56421]).transform('EPSG:4326', 'EPSG:3857');
var center = pnt.getCoordinates();

// const handleHomeClick = () => {
//     map.getView().setCenter(center);
// }

const handleHomeClick = () => {
    map.getView().animate({
        center,
        duration: 1500
    });
};