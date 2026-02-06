// /**
//  * @swagger
//  * tags:
//  *   name: Auth
//  *   description: Authentication APIs
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Tasks
//  *   description: Task Management APIs
//  */


// /* ============================
//    AUTH
// ============================ */

// /**
//  * @swagger
//  * /api/auth/register:
//  *   post:
//  *     summary: Register user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [name, email, password]
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User created
//  */

// /**
//  * @swagger
//  * /api/auth/login:
//  *   post:
//  *     summary: Login user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [email, password]
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: JWT token
//  */


// /* ============================
//    TASKS
// ============================ */

// /**
//  * @swagger
//  * /api/tasks:
//  *   post:
//  *     summary: Create task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [title]
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               status:
//  *                 type: string
//  *               dueDate:
//  *                 type: string
//  */

// /**
//  * @swagger
//  * /api/tasks:
//  *   get:
//  *     summary: List tasks
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *       - in: query
//  *         name: status
//  *         schema:
//  *           type: string
//  *       - in: query
//  *         name: search
//  *         schema:
//  *           type: string
//  */

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   get:
//  *     summary: Get task by ID
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  */

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   put:
//  *     summary: Update task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  */

// /**
//  * @swagger
//  * /api/tasks/{id}:
//  *   delete:
//  *     summary: Delete task
//  *     tags: [Tasks]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  */


/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Task Management API
 *   version: 1.0.0
 *   description: REST API for Task Management with JWT Authentication
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 *   - name: Tasks
 *     description: Task Management APIs
 */

/* ============================
   AUTH
============================ */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rakesh
 *               email:
 *                 type: string
 *                 example: r@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: r@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful (JWT token returned)
 *       401:
 *         description: Invalid credentials
 */


/* ============================
   TASKS
============================ */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish assignment
 *               description:
 *                 type: string
 *                 example: Complete task APIs
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: pending
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-10
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get task list (Pagination + Filter + Search)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: finish
 *     responses:
 *       200:
 *         description: Task list returned
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID (Owner/Admin)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6985737361f2524c853545c3
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6985737361f2524c853545c3
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish Credence Assignment
 *               description:
 *                 type: string
 *                 example: All APIs completed
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: in_progress
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-15
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task (Soft delete)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6985737361f2524c853545c3
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
