<?php 

ini_set("session.save_handler","redis");
session_save_path("tcp://213.165.93.33:6379");
ini_set("session.cookie_domain",".zeitfaden.com");

ini_set("max_execution_time",43200);


require_once('../application/application-files.php');
$applicationIni = parse_ini_file('../application/configuration/application.ini',true);

$serverContext = new \PivoleUndPavoli\ApacheServerContext();

$configLoader = new CompositeConfigLoader();


$dependencyConfigurator = new CompositeDependencyConfigurator();

$application = new ZeitfadenApplication(array(
  'httpHost' => $_SERVER['HTTP_HOST'],
  'dependencyConfigurator' => $dependencyConfigurator,
  'configLoader' => $configLoader,
  'configurationServiceName' => false,
  'applicationIni' => $applicationIni
));

$response = $application->runRestful($serverContext);

if ($response->isEnabled())
{
    $serverContext->sendResponse($response);
}











