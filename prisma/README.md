# Base de Datos - Seeder

Este directorio contiene el esquema de Prisma y el seeder para poblar la base de datos con datos de ejemplo.

## Archivos

- `schema.prisma` - Esquema de la base de datos
- `seed.ts` - Script para poblar la base de datos con datos de ejemplo
- `migrations/` - Directorio con las migraciones de la base de datos

## Uso del Seeder

### Prerrequisitos

1. Asegúrate de que la base de datos esté configurada y las migraciones aplicadas:
   ```bash
   npx prisma migrate dev
   ```

2. Instala las dependencias si no lo has hecho:
   ```bash
   npm install
   ```

### Ejecutar el Seeder

Para poblar la base de datos con datos de ejemplo:

```bash
npm run db:seed
```

### Datos Creados

El seeder crea los siguientes datos de ejemplo:

#### Usuarios
- **Cliente**: `cliente@example.com` / `password123`
- **Productor**: `productor@example.com` / `password123`
- **RRPP**: `rrpp@example.com` / `password123`
- **Sub-RRPP**: `subrrpp@example.com` / `password123`

#### Eventos
1. **Summer Electronic Festival 2024** - Festival de música electrónica
2. **Rock en el Parque** - Concierto de rock
3. **Reggaeton Night** - Noche de reggaeton

#### Artistas
- DJ Tiesto
- The Weeknd
- Bad Bunny
- Arctic Monkeys

#### Tags
- Electrónica, Rock, Pop, Hip Hop, Reggaeton, Festival, Club, Live Music

#### Tipos de Tickets
- General y VIP para diferentes eventos con precios variados

#### Tickets Comprados
- Algunos tickets de ejemplo con diferentes estados (Purchased, Pending)

## Estructura de la Base de Datos

### Entidades Principales

- **Events**: Eventos con información completa
- **Artist**: Artistas que participan en eventos
- **User**: Usuarios del sistema (Client, RRPP, Producer)
- **Producer**: Productores de eventos
- **RRPP**: Red de promotores con jerarquía
- **TicketType**: Tipos de tickets disponibles
- **TicketPurchased**: Tickets comprados por usuarios
- **Tag**: Etiquetas para categorizar eventos

### Relaciones

- Un evento puede tener múltiples artistas
- Un evento puede tener múltiples tags
- Un evento puede tener múltiples RRPPs asociados
- Un RRPP puede tener sub-RRPPs (jerarquía)
- Un evento puede tener múltiples tipos de tickets
- Los usuarios pueden comprar múltiples tickets

## Notas Importantes

- El seeder **limpia todos los datos existentes** antes de crear los nuevos
- Las contraseñas están hasheadas con bcrypt
- Los códigos de tickets son únicos y siguen un formato específico
- Las fechas de los eventos están configuradas para fechas futuras
- Las imágenes referencian archivos en el directorio `public/assets/`

## Comandos Útiles

```bash
# Ver el estado de la base de datos
npx prisma studio

# Generar el cliente de Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Resetear la base de datos
npx prisma migrate reset
``` 