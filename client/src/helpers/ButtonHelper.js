const ButtonHelper =  {

    buttonAction: function (id = '', args = ['edit', 'delete']) {
        let btnEdit = '';
        let btnDelete = '';
        if (args.includes('edit')) {
            btnEdit = <>&nbsp;<button type="button" className="btn btn-sm btn-primary" title="Sửa" data-toggle="modal" data-target="#modal-form"> Sửa</button></>;
        }
        if (args.includes('delete')) {
            btnDelete = <>&nbsp;<button type="button" className="btn btn-sm btn-danger" title="Sửa" data-toggle="modal" data-target="#modal-detele"> Xoá</button></>;
        }
        return <div className="text-center nowrap">{btnEdit}{btnDelete}</div>;
    }
}

export default ButtonHelper;
