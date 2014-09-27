<?php 
$startTime = microtime(true);
ini_set("session.save_handler","redis");
session_save_path("tcp://213.165.93.33:6379");
ini_set("session.cookie_domain",".zeitfaden.com");

ini_set("max_execution_time",43200);

$nowTime = microtime(true);
$duration = $nowTime-$startTime;
header('ZEITFADEN-SPRINT-A: '.$duration);


require_once('../application/application-files.php');

$nowTime = microtime(true);
$duration = $nowTime-$startTime;
header('ZEITFADEN-SPRINT-1: '.$duration);


$applicationIni = parse_ini_file('../application/configuration/application.ini',true);

$serverContext = new \PivoleUndPavoli\ApacheServerContext();

$configLoader = new CompositeConfigLoader();


$nowTime = microtime(true);
$duration = $nowTime-$startTime;
header('ZEITFADEN-SPRINT-2: '.$duration);



$dependencyConfigurator = new CompositeDependencyConfigurator();

$application = new ZeitfadenApplication(array(
  'httpHost' => $_SERVER['HTTP_HOST'],
  'dependencyConfigurator' => $dependencyConfigurator,
  'configLoader' => $configLoader,
  'configurationServiceName' => false,
  'applicationIni' => $applicationIni
));



$nowTime = microtime(true);
$duration = $nowTime-$startTime;
header('ZEITFADEN-SPRINT-3: '.$duration);

$response = $application->runRestful($serverContext);

$endTime = microtime(true);

$duration = $endTime-$startTime;
header('ZEITFADEN-TIMER-COMPLETE: '.$duration);

if ($response->isEnabled())
{
    $serverContext->sendResponse($response);
}











