# React 
- login
- register
- dashboard
- employee
  - list
  - create
  - edit
  - show
- landing page
- contact us


## Authenticate -> xác thực
user login -> go to system

## Authorize -> phân quyền (RBAC - role based access control)
operator
member -> view 
admin ->  view, create, edit, delete
- FE
  - by page
     - create product: admin, operator
     - list product: admin, operator, member
     - edit product: admin, operator
     - salary: admin
  - by action 
    - button Create: admin, operator
    - button Delete: admin
- BE CRUD - Create (POST), Read (GET), Update (PUT), Delete (DELETE)
  - GET /api/product/list -> access_token -> all role -> can
  - POST /api/product/create -> access_token -> admin, operator -> can

# Error Boundary
- fallback UI friendly when code react is error
- catch error, catch component error to easy keep to tracking
- user can action other method although has error