/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  _config: {
    actions: false,
    rest: false
  },
  viewUser: function(req, res) {
    res.json(req.session.user);
  },
  update: function(req, res) {},
  /**
   * Change paid/free plan
   *
   * @param _csrf
   * @method PUT
   * @endpoint /me/plan
   * @todo necesitamos tener acceso a los pagos/purchases? cuando expira
   * mi cuenta?
   */
  changePlan: function(req, res) {
    //aca hay que hacer el proceso por el cual posteo al
    //gateway de pago y con el resultado escribo
    //el account.
    return res.json(req.session.user.account);
  }
};
