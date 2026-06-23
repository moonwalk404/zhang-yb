@echo off
setlocal enabledelayedexpansion

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MVNW_REPOURL=https://repo.maven.apache.org/maven2"

if not defined MAVEN_OPTS set "MAVEN_OPTS=-Xmx1024m"
set "MAVEN_OPTS=%MAVEN_OPTS% -Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%"

set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"

if not exist "%WRAPPER_JAR%" (
    echo [ERROR] maven-wrapper.jar not found: %WRAPPER_JAR%
    exit /b 1
)

for %%i in (java.exe) do set "JAVA_EXE=%%~$PATH:i"
if not defined JAVA_EXE set "JAVA_EXE=java"

"%JAVA_EXE%" %MAVEN_OPTS% -classpath "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
