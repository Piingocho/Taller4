<?php
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "user";
 
    // object properties
    public $id_user;
    public $name_user;
    public $last_name_user;
    public $mail_user;
    public $phone_user;
    public $ci_user;
    public $pw_user;
    public $direccion;
    public $id_admin_id_user;
 
    public function __construct($db){
        $this->conn = $db;
    }

    function readAll(){
        $query = "SELECT * FROM " . $this->table_name ;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $this->executeSelect($stmt);
    }

    function login($email, $password){
        $query = "SELECT * FROM user WHERE mail_user='$email' AND pw_user='$password'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $this->executeSelect($stmt);
    }

    function addUser($n, $ln, $mail,$phone,$ci,$pw,$dir,$id_admin){
        // $verify = $this->readOne($id);
        // if(!sizeof($verify)>0){
            $query = "INSERT INTO " . $this->table_name."(name_user,last_name_user,mail_user,phone_user,ci_user,pw_user,direccion,id_admin_id_user) VALUES('$n','$ln','$mail','$phone','$ci','$pw','$dir','$id_admin')";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return "OK";
        // }
        // else{
        //     return NULL;
        // }
    }

    function deleteOne($id){
        $query = "DELETE FROM " . $this->table_name." WHERE id_user='$id' LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return "OK";
    }

    function readOne($id){
        $query = "SELECT * FROM " . $this->table_name." WHERE id_user = '$id'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $this->executeSelect($stmt);
    }

    function executeSelect($stmt){
        $num = $stmt->rowCount();
        $users=array();
        if($num>0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $user_item=array(
                    "id_user" => $id_user,
                    "name_user" => $name_user,
                    "last_name_user" => $last_name_user,
                    "mail_user" => $mail_user,
                    "phone_user" => $phone_user,
                    "ci_user" => $ci_user,
                    "pw_user" => $pw_user,
                    "direccion" => $direccion,
                    "id_admin_id_user" => $id_admin_id_user,
                );
                array_push($users, $user_item);
            }
        }
        return $users;
    }
}
?>