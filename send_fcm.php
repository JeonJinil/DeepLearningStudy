<?php
        function send_fcm($message, $id) {
$url = 'https://fcm.googleapis.com/fcm/send';

$headers = array (
'Authorization: key=' . GOOGLE_API_KEY,
'Content-Type: application/json'
);

$fields = array (
'data' => array ("lat" => $message['lat'],"log"=> $message['log']),
'notification' => array ("body" => $message['body'],"title"=>$message['title'])
);

if(is_array($id)) {
$fields['registration_ids'] = $id;
} else {
$fields['to'] = $id;
}

$fields['priority'] = "high";

$fields = json_encode ($fields);

$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_POST, true );
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );

$result = curl_exec ( $ch );
if ($result === FALSE) {
//die('FCM Send Error: ' . curl_error($ch));
}
curl_close ( $ch );
return $result;
}

        //데이터베이스에 접속해서 토큰들을 가져와서 FCM에 발신요청
        include_once 'config.php';
        $conn = new mysqli("localhost","root","123123","test");

        if ($conn->connect_error) {
           die("Connection failed: " . $conn->connect_error);
        }
echo "Connected successfully";

        $sql = "Select Token From android";
        $tokens = array();
        $result = $conn->query($sql);
        if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                        $tokens[] =  $row["Token"];
                }
        } else { echo "0 result";}

        $myMessage = $_POST['message']; //폼에서 입력한 메세지를 받음
        if ($myMessage == ""){
                $myMessage = "새글이 등록되었습니다.";
        }
        $message = array("body" => $myMessage, "title"=> "제목","lat"=>$_POST['lat'] , "log"=>$_POST['log']);

        $rt = send_fcm($message,$tokens);
        echo $rt;

 ?>
