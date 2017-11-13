<?php
	$conn = new mysqli("localhost", "root", "123123","test");
	if( $conn->connect_error) {
	 die("Connection failed: ".$conn->connect_error);
	}
	
	
 $result =$conn->query("SELECT value FROM test2");

 //0이 넘어짐.
$arr = array();
while($row=$result->fetch_assoc()){
			array_push($arr,$row);
		}	
//header('Content-Type : application/json; charset=utf-8');	
	echo json_encode($arr);
	$conn->close();
?>