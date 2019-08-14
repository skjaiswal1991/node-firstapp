<?php

header('Access-Control-Allow-Origin: *');

$data = array();

$timer = array();
$timerdata = array();

$timer[] = array(
                    'timer_code'=> '1',
                    'set_time'=>66,
                    'event'=>1
                );
// $timer[] = array(
//                     'timer_code'=> '2',
//                     'set_time'=>54,
//                     'event'=>1
//                 );                
$timer[] = array(
                    'timer_code'=> '3',
                    'set_time'=>33,
                    'event'=>1
                );
$timer[] = array(
                    'timer_code'=> '4',
                    'set_time'=>56,
                    'event'=>1
                );

$data[] = array(    'apikey' => 'sanjay', 
                    'customer_code'=>'12',
                    'timerdata' => $timer  
                );
                   

// $timerdata[] = array( 
//                     'timer_code'=> '41',
//                     'set_time'=>88,
//                     'event'=>1
//                 );
// $timerdata[] = array(
//                     'timer_code'=> '42',
//                     'set_time'=>54,
//                     'event'=>1
//                 );                
$timerdata[] = array(
                    'timer_code'=> '43',
                    'set_time'=>52,
                    'event'=>1
                );
$timerdata[] = array(
                    'timer_code'=> '44',
                    'set_time'=>77,
                    'event'=>1
                );

$data[] = array(    'apikey' => 'sanjaytest', 
                    'customer_code'=>'40',
                    'timerdata' => $timerdata 
                );                

echo json_encode($data);


?>