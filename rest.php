<?php 
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











