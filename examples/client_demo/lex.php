<?php
//db connection
$conn["host"] = "<mysql ip>";
$conn["user"] = "<mysql user>";
$conn["pwd"]  = "<mysql pwd>";
$conn["db"]   = "<mysql db>"; 


$errortxt ='';    
if($_POST['lexjs']){
   $sql=$_POST['lexjssql'];
   $wordlist= getResult($sql, $errortxt);
   if($errortxt){
          $output['rc']=0;
          $output['errmsg']=$errortxt; 
          $output['result'] =$errortxt;
   }else {
       $output['rc']=1;
       $output['result'] =$wordlist;
   }
}
echo  json_encode($output) ; 
 

function getResult($insql, &$errortxt){
    global $conn;
    $linkID = mysql_pconnect($conn['host'], $conn['user'], $conn['pwd']) ;
    if (!mysql_ping($linkID)){
            $linkID  = mysql_pconnect($conn['host'], $conn['user'], $conn['pwd']) ;
        }
    $errortxt=mysql_error($linkID); 
    if ($errortxt!='') { return false;}
    
    mysql_select_db($conn["db"], $linkID) ;
    $errortxt=mysql_error($linkID);
    if ($errortxt!='') { return false;}
    
    $result= mysql_query($insql, $linkID) ; 
    $errortxt=mysql_error($linkID);
     if ($errortxt!='') {return false;} 
     $ii=0   ;
     while ($ii<mysql_num_rows($result)) {
            $row = mysql_fetch_assoc($result);
            if($row['word']){$outlist[]=$row['word'];}
            $ii++;
            }
      mysql_free_result($result);
     return $outlist;
}


?>

