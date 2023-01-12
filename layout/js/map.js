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

const handleZoomInClick = () => {
    const zoom = map.getView().getZoom() + 1;
    map.getView().animate({
        zoom,
        duration: 500
    });
};

const handleZoomOutClick = () => {
    const zoom = map.getView().getZoom() - 1;
    map.getView().animate({
        zoom,
        duration: 500
    });
};