$(document).ready(function(){ 
    function front_when_submit()
    {
        const formTodo = $('.form-add-todo-js');
        const btnSubmit = formTodo.find('button[type="submit"]');
        
        btnSubmit.children('svg').attr('class','fas fa-spin fa-spinner'); 
    }
    function add_todo(e)
    {
        e.preventDefault();
        const newTodo = $(this).find('input').val();
        const notify = $('.todo-header-js').find('.todo-notify-js');
        const todoBody = $('.todo-body-js');
        front_when_submit();
        if(newTodo == '')
        {
            notify.removeClass('d-none');
        } else {
            if(todoBody.find('ul').length == 0)
            {
                todoBody.append('<ul></ul>');
            }
            todoBody.find('.no-todo-notify-js').remove();
            todoBody.find('ul').append(blockTodo(newTodo));
            $(this).find('input').val('');
        }
    }
    function blockTodo(newTodo)
    {
        let todo ='<li>\n'+
                        '<span class="primary hand">\n'+
                            '<i class="fas fa-edit"></i>\n'+
                        '</span>\n'+
                        '<p>'+newTodo+'</p>\n'+
                        '<button class="btn btn-danger">&times;</button>\n'+
                  '</li>'
        ;
             
        return todo;
    }

    $(document).on('submit','.form-add-todo-js',add_todo);
});