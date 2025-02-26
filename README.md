# devsecops-project
Technical challenge for DevSecOps team!!

## Introducción

Este es el repositorio con la prueba técnica para el equipo de Seguridad de TI DevSecOps de Bancolombia, está compuesto de una ToDo App de ejemplo que usa un frontend sencillo hecho en react y una base de datos local de SQLite usando node.js y express para el backend, este código se usó para construir los pipelines de CI/CD teniendo como base esta aplicación sencilla.

## Repositorio

El repositorio del proyecto utiliza un modelo de ramificación trunk base development, para las ramas de desarrollo se deben nombrar como feature/*, para las tareas de integración de prácticas de DevSecOps se hizo uso de la librería open source [devsecops-engine-tools](https://github.com/bancolombia/devsecops-engine-tools), que además tambien es útil para el envío de vulnerabilidades hacia la plataforma de centralización de vulnerabilidades, para la configuración de la herramienta se usa el siguiente [repositorio](https://github.com/jcamilomolinar/devsecops_remote_config). Pasando a la configuración de los pipelines CI/CD se tienen implementados tres workflows, a continuación se describe su uso.

1. **ci** ```trunk, feature/*```
    - Tareas de instalación de dependencias y ejecución de tests tanto del frontend como del backend de la ToDo App.
    - Escaneo de infraestructura como código (con la herramienta [**Checkov**](https://www.checkov.io/)) donde se cubre la seguridad de los Dockerfile usados para dockerizar la ToDo App y el template de CloudFormation usado para el despliegue de la plataforma de centralización de vulnerabilidades en AWS.
    - Escaneo de dependencias (con la herramienta [**Dependency Check**](https://github.com/dependency-check/DependencyCheck)) del proyecto donde se cubre la seguridad de las dependencias de npm del front y back de la ToDo App.

2. **cd** ```trunk```
    - Tarea donde se usa la librería semantic-release para generación automática de releases según los nombres de los commits (haciendo uso de Conventional Commits).
    - Flujo alternativo (que se activa si el nombre del commit contiene ***deploy docker hub***) donde se realiza el login a Docker Hub, se construyen las imágenes de cada parte de la ToDo App y se hace push a Docker Hub, pero antes de realizar la subida se ejecuta un escaneo de estos contenedores generados (con la herramienta [**Trivy**](https://trivy.dev/latest/getting-started/)) donde se cubre la seguridad de las imágenes evitando ser pusheadas en caso de violar los umbrales definidos.

3. **security_scan** ```pull request: trunk ⬅️ feature/*```
    - Este workflow se ejecuta en los pull request enviados hacia trunk, donde se ejecuta un escaneo de código estático (con la herramienta [**Bearer**](https://docs.bearer.com/quickstart/)) la cual cuenta con compatibilidad con los lenguajes utilizados, además también se ejecuta un escaneo de secretos (con la herramienta [**Gitleaks**](https://github.com/gitleaks/gitleaks)) en busca de posibles filtraciones introducidas desde las ramas de desarrollo, se espera que pasen estas validaciones de seguridad para poder integrar el nuevo código.

---

## Plataforma de centralización de vulnerabilidades

Para la implementación de la ASPM se usó un proyecto open source (pero que también tiene su propio SaaS con más funcionalidades), llamado [***Defect Dojo***](https://www.defectdojo.org/) es una herramienta de gestión de vulnerabilidades y pruebas de seguridad diseñada para ayudar a los equipos de seguridad a rastrear, priorizar y gestionar hallazgos de seguridad en el ciclo de desarrollo de software. Dentro de las principales características de esta plataforma están:

> - Permite consolidar hallazgos de múltiples herramientas de seguridad en un solo lugar.
> - Facilita la correlación de vulnerabilidades en diferentes pruebas de seguridad.
> - Integraciones con una gran variedad de herramientas de seguridad
> - Historial de vulnerabilidades y reportes detallados de seguimiento.
> - Manejo de estado de vulnerabilidades (Abierto, En proceso, Cerrado, etc.).
> - Panel de control con métricas de seguridad.

### Despliegue en AWS
...

---

## Estrategias de priorización de vulnerabilidades

- Considerar la severidad de la vulnerabilidad, la facilidad de explotación y el valor de los activos afectados.

- Clasificar las Vulnerabilidades utilizando sistemas como CVSS (Common Vulnerability Scoring System) para asignar puntuaciones y determinar la criticidad.

- Abordar primero las vulnerabilidades críticas y de alto riesgo, estableciendo plazos claros para su resolución.