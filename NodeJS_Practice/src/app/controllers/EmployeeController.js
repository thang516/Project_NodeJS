const db = require('../../config/db')
const {mongooseToObject} = require("../../util/mongoose");

class EmployeeController {
    // join  GET  /em/employee/join
    list(req, res, next) {
        db.connectDb.query("SELECT e.name,e.position,e.age,e.phone,e.address,e.email,t.name_type FROM employees e INNER JOIN type_employee t ON t.id = e.employee_type_id \n" +
            "ORDER BY e.name asc",
            (err, result, fields) => {
            res.render('employees/show', {products: result})
                console.log(result)
                // res.json(result)

        })
    }




    search(req, res, next) {
        console.log("voooooooooooooo",req.query.name,req.query.phone,req.query.name_type)
        db.connectDb.query(`SELECT e.name,e.position,e.age,e.phone,e.address,e.email,t.name_type  FROM employees e 
            INNER JOIN type_employee t ON t.id = e.employee_type_id WHERE e.name like '%${req.query.name}%' and
            e.phone like '%${req.query.phone}%' and t.name_type like '%${req.query.name_type}%'
            ` , (err, result, fields) => {
                res.render('employees/show', {products: result})
                console.log(result + "dddddđ")
            })
    }


    index(req, res, next) {
        db.connectDb.query("SELECT * FROM employees", (err, result, fields) => {
            res.render('employees/show', {products: result})
        })
    }
    create(req, res) {
        res.render('employees/create')
    }




    //POST products/save
    save(req, res) {
        db.connectDb.query("INSERT INTO employees(`name`,position,age,phone,address,image,email)VALUE(?,?,?,?,?,?,?)"
            , [req.body.name, req.body.position, req.body.age, req.body.phone, req.body.address, req.body.image, req.body.email], (err, result, fields) => {
                console.log(req.body)
                console.log(result)
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/em/employee")
                }
            })

    }

    delete(req, res) {
        console.log('req.body.id', req.params)
        db.connectDb.query("DELETE FROM employees WHERE id = ?", [req.params.id], (error, result, fields) => {
            if (error) {
                console.error('Lỗi khi xóa dữ liệu:', error);
            } else {
                res.redirect("/em/employee")
            }
        })
    }


    edit(req, res,next) {
        db.connectDb.query("SELECT * FROM employees WHERE id = ?", [req.params.id], (error, result, fields) => {

            if (error) {
                console.error('Lỗi', error);

            } else {
            res.render('employees/edit',{
                employee : result[0]
                })
                // res.render('employees/edit')
            }
        })
    }

    //POST products/save
     update(req, res, next) {
         db.connectDb.query("UPDATE employees SET `name` = ? ,position = ?,age = ?,phone = ?,address = ? ,image = ? ,email = ?  WHERE id = ?;",
             [req.body.name, req.body.position, req.body.age, req.body.phone, req.body.address, req.body.image, req.body.email,req.params.id] , (error, result, fields) => {
                 if (error) {
                     console.error('update error', error);
                 } else {
                     res.redirect("/em/employee")
                 }
             })
     }



}

module.exports = new EmployeeController();
