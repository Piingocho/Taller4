<?php

header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


include_once './config/database.php';
include_once './config/user.php';

$database = new Database();
$db = $database->getConnection();


$user = new User($db);

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $email = $input['email'];
    $password = $input['password'];
    $data = $user->login($email,$password);
    if(sizeof($data)>0){
        http_response_code(200);
        echo json_encode($data[0]);
    }else{
        http_response_code(403);
        echo json_encode(['error'=> 'Su email y password son incorrectos.','status'=>FALSE]);
    }
}else{
    http_response_code(403);
    echo json_encode(['error'=> 'Error try with Method GET()','status'=>FALSE]);
}

?>
