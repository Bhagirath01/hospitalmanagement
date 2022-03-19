Vender = require('../../models/vender');


async function addVender(req, res, next) {
    try {
        
        const vender = new Vender({
            ...req.body,
        });

        const venderObj = await vender.save();
        res.json({ status: true, message: "Vender Created Successfully", data: venderObj });

    } catch (err) {
      console.log(err);
      res.json({ status: false, message: "Unable to send request", data: {} });

    }
  
  }
  exports.addVender = addVender;


  async function venderUpdate(req, res) {
    try {
        const vender = await Vender.findByIdAndUpdate({ _id: req.params.vender_id }, {
            ...req.body
        }, {
            omitUndefined: true,
            new: true,
        });
        const venderData = await vender.save()
       

        res.json({ status: true, message: "vender updated successfully", data: venderData });
    } catch (err) {
        console.log(err);
        res.json({ status: false, message: "unable to update vender data", data: {} });

    }
}
exports.venderUpdate = venderUpdate;


async function deletevender(req, res) {
	Vender.findOneAndRemove({_id: req.params.vender_id}, (err) => {
		if (err) {
			res.json({ status: false, message: "unable to delete"})
		}else{
			res.json({ status: true, message: "hospital deleted successfully"})
		}
	});
}
exports.deletevender = deletevender;



async function getVender(req, res) {

    var resData = {};
    var objFilters = {};
    var perPage = (req.body.perpage) ? parseInt(req.body.perpage) : 10;
    var currPage = (req.body.page && req.body.page > 0) ? parseInt(req.body.page) : 1;
    currPage = currPage - 1;
    // var limit = (currPage*perPage)+perPage;
    var limit = perPage;
    var start = (currPage * perPage);
    var orderBy = { created_at: 'desc' };

    if (req.body.order_by) {
        if (req.body.order_by == 'oldest') {
            orderBy = { created_at: 'asc' };
        }
        if (req.body.order_by == 'latest') {
            orderBy = { created_at: 'desc' };
        }
    }

    objFilters['status'] = 1;

    if (req.body.search) {
        objFilters['$or'] = [
            { email: { $regex: req.body.search, $options: "i" } },
            { name: { $regex: req.body.search, $options: "i" } },
            { companyname: { $regex: req.body.search, $options: "i" } }
        ];
    }
    Vender.find(objFilters).limit(limit).skip(start).sort(orderBy)
    .exec(function (err, venders) {
        console.log(venders);
        if (!err) {
            resData['vender'] = venders;
            
                Vender.count(objFilters).exec(function (err, countTotal) {
                    if (!err) {
                        resData['pagination'] = {
                            current_page: (currPage + 1),
                            total_pages: Math.ceil(countTotal / perPage),
                            total_records: countTotal
                        }
                    }
                });

        } else {
            res.status(200).json({ status: false, message: 'Unable to fetch data', data: {} });
        }

    });
}
exports.getVender = getVender;
  
    