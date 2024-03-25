<?php
include 'db_config.php';

$servername = 'sql107.infinityfree.net'; 
$username = 'if0_36110140_forum';     
$password = 'spinningnigers';         
$database = 'if0_36110140_forum'; 

$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT id, title FROM topics";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $topics = array();
    while($row = $result->fetch_assoc()) {
        $topics[] = $row;
    }
    echo json_encode($topics);
} else {
    echo json_encode(array()); 
}

$conn->close();
?>