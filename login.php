<?php
	$conn = new mysqli("localhost", "root", "123123","test");
	if( $conn->connect_error) {
	 die("Connection failed: ".$conn->connect_error);
	}
	
if(isset($_POST["id"]) && !empty($_POST["id"])){
 	$id = $_POST["id"];
 }else{
 	$id = null;	
 }
 if(isset($_POST["pw"]) && !empty($_POST["pw"]) ){
	$pw = $_POST["pw"];	
 }else{
	$pw = null; 
 }
 
 $sql = "SELECT * FROM user WHERE id = '".$id."'AND pass = '".$pw."'";
 //$sql = "SELECT * FROM USERS WHERE id = '".$id."'";
 $result =$conn->query($sql);
 
 if($result->num_rows >0 ){
    header("Location: http://13.124.130.101/main.html");
	die();
 }else{
    header("Location: http://13.124.130.101/login.html");
	die();
 }
$conn->close();
    
?>