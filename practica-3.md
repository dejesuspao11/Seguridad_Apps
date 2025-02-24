# ¿Qué son los microservicios?

Los **microservicios** son una arquitectura de software donde una aplicación se construye como un conjunto de pequeños servicios independientes que se comunican entre sí. Cada microservicio realiza una función específica y es autónomo, lo que permite a los desarrolladores enfocarse en partes pequeñas y manejables del sistema.  
Los microservicios pueden comunicarse con otros a través de **APIs**.  
Las plataformas como **Amazon Web Services (AWS)**, **Google Cloud** y **Microsoft Azure** son ideales para la implementación de microservicios debido a su capacidad de escalar recursos fácilmente.  
En lugar de tener una única parte de código que haga todo, la aplicación se divide en varias partes pequeñas, cada una encargada de una tarea específica.  
Cada microservicio puede trabajar de manera independiente, pero todos se comunican entre sí para que la aplicación funcione correctamente.

## ¿Por qué es beneficioso?

### Flexibilidad
En una arquitectura de microservicios, si un servicio presenta algún problema o requiere una actualización, dicha modificación no impacta en el funcionamiento de los demás microservicios. Esto permite que la aplicación o sistema continúe operando de manera ininterrumpida, sin que se vean comprometidos otros procesos o funcionalidades.

### Escalabilidad
En situaciones en las que se necesite aumentar la capacidad de un área específica del sistema, es posible agregar nuevos microservicios sin necesidad de modificar toda la estructura. Esta característica facilita la adaptación a un mayor volumen de usuarios o datos sin interrumpir el funcionamiento global de la plataforma.

### Flexibilidad tecnológica
Cada microservicio puede ser desarrollado utilizando distintas tecnologías y lenguajes de programación, adaptándose a las necesidades particulares de cada tarea que debe realizar. Esta autonomía tecnológica permite optimizar el rendimiento de cada componente de manera independiente.

### Resiliencia
La arquitectura de microservicios favorece la resiliencia del sistema, ya que si un microservicio experimenta fallos, no necesariamente se ve afectado el funcionamiento de otros servicios. Esta independencia y desacoplamiento de los microservicios contribuyen a minimizar el impacto de los errores en la estabilidad del sistema en su conjunto.

## Posibles Desafíos

### Complejidad
La gestión de múltiples microservicios puede resultar compleja, especialmente en lo que respecta a la comunicación entre los diferentes servicios y al monitoreo de su rendimiento. El manejo adecuado de esta arquitectura exige un nivel elevado de coordinación y una infraestructura que permita gestionar eficientemente los diversos componentes interconectados.

### Coordinación
La implementación de microservicios requiere un enfoque riguroso para la gestión de las **APIs**, así como para la sincronización y la interacción entre los distintos servicios. A medida que el número de microservicios crece, la complejidad de mantener una integración coherente y sin errores también aumenta, lo que exige una planificación detallada.

### Despliegue y Mantenimiento
El despliegue y mantenimiento de una infraestructura basada en microservicios puede ser más desafiante que en una arquitectura monolítica. La necesidad de gestionar varios servicios independientes conlleva una mayor complejidad en cuanto a la actualización, monitoreo y resolución de problemas, lo que puede aumentar los costos operativos.

### Seguridad
Cada microservicio posee su propia superficie de ataque, lo que implica que cada componente debe ser protegido de manera individual. Esto requiere la implementación de un enfoque de seguridad integral que garantice la protección de todas las interacciones y datos en cada uno de los servicios, así como la gestión adecuada de las vulnerabilidades potenciales.

## Patrones Comunes de Microservicios

- **API Gateway**: Un punto central donde se gestionan todas las peticiones y se distribuyen a los microservicios correspondientes.
- **Event-Driven Architecture (EDA)**: Los microservicios pueden comunicarse entre sí a través de eventos, lo que puede facilitar la sincronización y la escalabilidad.
- **Service Discovery**: Un sistema donde los microservicios pueden encontrar y comunicarse con otros servicios de forma dinámica, sin necesidad de configuraciones manuales.

## Ejemplos:

### Spotify (Plataforma de Streaming de Música)
Spotify es una de las plataformas de streaming de música más grandes del mundo. Para gestionar la enorme cantidad de datos que maneja, como las preferencias de los usuarios, la reproducción de música, las listas de reproducción, etc., **Spotify utiliza microservicios**.

#### Cómo usan los microservicios:
Spotify descompone su aplicación en múltiples microservicios que manejan funciones como la gestión de las canciones, las recomendaciones personalizadas, la creación de listas de reproducción, la gestión de cuentas de usuario, y la administración de anuncios.  
Cada microservicio se encarga de una función específica y puede ser actualizado de manera independiente sin afectar el resto del sistema. Esto les permite desplegar nuevas características o arreglar errores rápidamente, sin que haya tiempos de inactividad significativos.  
Spotify también usa microservicios para la escala dinámica. Por ejemplo, durante picos de tráfico, como el lanzamiento de nuevas funciones o eventos especiales, Spotify puede aumentar la capacidad de ciertos microservicios (como el de reproducción de música) sin afectar otros servicios.

### Airbnb (Plataforma de Alquiler de Alojamiento)
**Airbnb** es una plataforma global que permite a los usuarios alquilar propiedades o habitaciones en lugar de hospedarse en hoteles tradicionales. Debido a la enorme variedad de servicios que ofrece (alquileres, pagos, reseñas, gestión de anfitriones, etc.), **Airbnb ha adoptado una arquitectura de microservicios** para manejar su infraestructura de manera eficiente.

#### Cómo usan los microservicios:
- **Gestión de listados**: Airbnb utiliza microservicios para gestionar los anuncios de propiedades, lo que incluye la creación de nuevos anuncios, la actualización de disponibilidad, precios y descripciones de las propiedades. Cada servicio puede manejar un aspecto específico del listado sin interferir con otros servicios.
- **Reservas y disponibilidad**: Los microservicios se encargan de verificar la disponibilidad de las propiedades, gestionar las solicitudes de reserva, y calcular las tarifas dinámicas basadas en la demanda.
- **Sistema de pagos**: Airbnb gestiona el pago a través de microservicios que interactúan con varias pasarelas de pago, como tarjetas de crédito, PayPal, etc. Además, estos microservicios también permiten gestionar las comisiones y los pagos entre anfitriones y la plataforma.
- **Reseñas y calificaciones**: Un microservicio dedicado maneja las reseñas de los usuarios, tanto las que dejan los huéspedes como las que dejan los anfitriones. Este servicio se encarga de almacenar las calificaciones y comentarios, y de calcular el puntaje de los anfitriones.
- **Gestión de usuarios y autenticación**: Los microservicios también están involucrados en la autenticación de los usuarios, gestionando el inicio de sesión, la creación de perfiles, las configuraciones de privacidad, y las interacciones de los usuarios con la plataforma.

## Referencias

- [¿Qué son los microservicios? Ventajas de la arquitectura de microservicios](https://www.redhat.com/es/topics/microservices/what-are-microservices)
- [IBM. (2025, 13 febrero). Microservices. Think](https://www.ibm.com/think/topics/microservices)
- [Design Gurus. (s. f.). Discuss Spotify system architecture](https://www.designgurus.io/answers/detail/discuss-spotify-system-architecture)
- [Microservice Architecture pattern](https://microservices.io/patterns/microservices.html)