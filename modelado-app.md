# 📊 Modelo Entidad–Relación – Sistema de Inventario de Activos

Este modelo representa el diseño lógico de una base de datos para una aplicación que gestiona activos de TI (principalmente laptops y monitores) dentro de una empresa. La base de datos permite registrar, asignar y rastrear el estado de los activos, así como mantener un historial de asignaciones.

---

## 🧩 Entidades y Atributos

### 1. **Users**
- `user_id` (PK): Identificador único del usuario
- `full_name`: Nombre completo
- `email`: Correo electrónico
- `department`: Departamento

### 2. **Assets**
- `serial_number` (PK): Número de serie único del activo
- `make`: Marca del activo (ej. Dell, HP)
- `model`: Modelo del activo
- `status`: Estado actual (`'free'` o `'assigned'`)
- `user_id` (FK): Referencia al usuario asignado (nullable)
- `vendor_id` (FK): Referencia al proveedor (Company Owned, KC Rentas, New Era)
- `asset_type_id` (FK): Tipo de activo (Laptop, Monitor)

### 3. **Vendor**
- `vendor_id` (PK): Identificador único del proveedor
- `name`: Nombre del proveedor (Company Owned, KC Rentas, New Era)

### 4. **AssetType**
- `asset_type_id` (PK): Identificador del tipo de activo
- `name`: Nombre del tipo (Laptop, Monitor)

### 5. **AssetAssignmentHistory**
- `assignment_id` (PK): Identificador único del historial de asignación
- `serial_number` (FK): Número de serie del activo asignado
- `user_id` (FK): Usuario al que se asignó el activo
- `assigned_date`: Fecha de asignación
- `returned_date`: Fecha de devolución (nullable)

---

## 🔗 Relaciones

| Entidad A                  | Relación     | Entidad B         | Cardinalidad     |
|----------------------------|--------------|--------------------|------------------|
| Users ↔ Assets             | Uno a Muchos | Un usuario puede tener varios activos |
| Assets ↔ Vendor            | Muchos a Uno | Cada activo proviene de un proveedor |
| Assets ↔ AssetType         | Muchos a Uno | Cada activo tiene un tipo definido |
| Assets ↔ AssetAssignmentHistory | Uno a Muchos | Un activo puede tener múltiples asignaciones históricas |
| Users ↔ AssetAssignmentHistory | Uno a Muchos | Un usuario puede aparecer en varias asignaciones |

---

## 🖼️ Diagrama Entidad–Relación

 <img src="assets/diagrama.png" alt="diagrama" width="100%"/>

> *Nota: Este diagrama representa las relaciones descritas anteriormente. Incluye claves primarias, claves foráneas y cardinalidades correspondientes.*

---

## ✅ Consideraciones Finales

- El sistema tiene únicamente **tres proveedores válidos**:
  - Company Owned
  - KC Rentas
  - New Era
- Se utiliza `serial_number` como **clave primaria** para identificar activos de forma única.
- El historial de asignaciones permite realizar auditorías y seguimiento detallado.