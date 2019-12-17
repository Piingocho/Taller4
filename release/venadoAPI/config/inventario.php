<?php
class Inventario{
 
    // database connection and table name
    private $conn;
    private $table_name = "inventario";
 
    // object properties
    public $idproducto;
    public $nombre;
    public $costo;
    public $fecha;
 
    public function __construct($db){
        $this->conn = $db;
    }

    function readAll(){
        $query = "SELECT * FROM " . $this->table_name ;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $this->executeSelect($stmt);
    }

    function addProduct($n, $c, $id){
        // $verify = $this->readOne($id);
        // if(!sizeof($verify)>0){
            $query = "INSERT INTO " . $this->table_name." (nombre,costo,idproducto) VALUES ('$n','$c','$id')";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return "OK";
        // }
        // else{
        //     return NULL;
        // }
    }

    function deleteOne($id){
        $query = "DELETE FROM " . $this->table_name." WHERE idproducto='$id' LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return "OK";
    }

    function readOne($id){
        $query = "SELECT * FROM " . $this->table_name." WHERE idproducto = '$id'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $this->executeSelect($stmt);
    }

    function executeSelect($stmt){
        $num = $stmt->rowCount();
        $inventario=array();
        if($num>0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $product_item=array(
                    "idproducto" => $idproducto,
                    "nombre" => $nombre,
                    "costo" => $costo,
                    "fecha" => $fecha
                );
                array_push($inventario, $product_item);
            }
        }
        return $inventario;
    }
}
?>