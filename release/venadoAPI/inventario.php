<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

include_once './config/database.php';
include_once './config/inventario.php';

$database = new Database();
$db = $database->getConnection();


$inventario = new Inventario($db);
if($_SERVER["REQUEST_METHOD"] == "GET") {
    $url = $_SERVER['REQUEST_URI'];
    $params = explode("/",$url);
    if(sizeof($params) == 4){
        $data = $inventario->readOne($params[3]);
        if(sizeof($data)>0){
            http_response_code(200);
            echo json_encode($data);
        }else{
            http_response_code(403);
            echo json_encode(['error'=> 'No hay datos.','status'=>FALSE]);
        }
    }else{   
        $data = $inventario->readAll();
        // if(sizeof($data)>0){
        http_response_code(200);
        echo json_encode($data);
        // }else{
        //     http_response_code(403);
        //     echo json_encode(['error'=> 'No hay datos.','status'=>FALSE]);
        // }
    }
}else if($_SERVER["REQUEST_METHOD"] == "POST"){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $costo = $input['costo'];
    $nombre = $input['nombre'];
    $idproducto = $input['idproducto'];
    $result = $inventario->addProduct($nombre,$costo,$idproducto);
    if($result != NULL){
        http_response_code(200);
        echo json_encode(['mensaje'=> 'Producto registrado.','status'=>TRUE]);
    }else{
        http_response_code(403);
        echo json_encode(['error'=> 'No se registro el producto','status'=>FALSE]);
    }

}else if($_SERVER["REQUEST_METHOD"] == "DELETE"){
    $url = $_SERVER['REQUEST_URI'];
    $params = explode("/",$url);
    if(sizeof($params) == 4){
        $result = $inventario->deleteOne($params[3]);
        if($result != NULL ){
            http_response_code(200);
            echo json_encode(['mensaje'=> 'Producto Eliminado.','status'=>TRUE]);
        }else{
            http_response_code(403);
            echo json_encode(['error'=> 'No hay datos.','status'=>FALSE]);
        }
    }else{
        http_response_code(403);
        echo json_encode(['error'=> 'No hay datos.','status'=>FALSE]);
    }
}else{
    http_response_code(403);
    echo json_encode(['error'=> 'No hay datos.','status'=>FALSE]);
}

?>
