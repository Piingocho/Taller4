<?php
$hostname = "localhost";
$usuario = "root";
$password = "";
$basededatos = "pagos";
$mysqli = new mysqli($hostname, $usuario, $password, $basededatos);
$mysqli->set_charset("utf8");

$idproducto = $_POST ['idproducto'];
$nombre = $_POST ['nombre'];
$costo = $_POST ['costo'];

$sql = "INSERT INTO inventario (idproducto, nombre, costo) VALUES ('$idproducto', '$nombre', '$costo')";
$resultado = $mysqli->query($sql);


echo "Datos ingresados correctamente.";
?>