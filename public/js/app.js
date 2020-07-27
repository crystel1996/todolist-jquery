$(document).ready(function(){ 
    
    /** Notify = le block de notification si le formulaire est vide 
     * todoBody = le body de todo qui affiche la liste des todos
    */
    const notify = $('.todo-header-js').find('.todo-notify-js');
    const todoBody = $('.todo-body-js');
    const todoBlockUl = '<ul><li class="not-todo-js"><a href="#" class="danger init-todo-js">Reinitialiser</a></li></ul>';

    /** Vérifier si le formulaire est valide */
    function submit_todo_valid(todo)
    {
        if(todo == '') { return false;}
        return true;
    }

    /**Ajouter une nouvelle todo */
    function add_todo(e)
    {
        e.preventDefault();
        const newTodo = $(this).find('input').val();
        if(!submit_todo_valid(newTodo))
        {
            notify.removeClass('d-none');
            notify.fadeIn().delay(2000).fadeOut();
        } else {
            if(todoBody.find('ul').length == 0)
            {
                todoBody.append(todoBlockUl);
            }
            todoBody.find('.no-todo-notify-js').addClass('d-none');
            todoBody.find('ul').append(blockTodo(newTodo));
            $(this).find('input').val('');
        }
    }

    /**Supprimer une todo */
    function delete_todo(e)
    {
        e.preventDefault();
        const li = $(this).parent('li');
        li.remove();
        if(todoBody.find('ul li:not(.not-todo-js)').children().length == 0)
        {
            todoBody.find('ul').remove();
            todoBody.find('.no-todo-notify-js').removeClass('d-none');
        }
    }

    /**Selectionner une todo pour editer */
    function edit_todo()
    {
        const todo = $(this).siblings('p').text();
        const li = $(this).parent('li');
        const form = $('.form-add-todo-js, .form-edit-todo-js');
        const input = form.find('input');
        input.val(todo);
        form.removeClass('form-add-todo-js').addClass('form-edit-todo-js');
        if(todoBody.find('li.edited').length > 0)
        {
            todoBody.find('li').removeClass('edited');
        } 
        li.addClass('edited');
    }

    /**Editer une todo */
    function edited_todo(e)
    {
        e.preventDefault();
        const form = $(this);
        const editTodo = form.find('input').val();
        const li = todoBody.find('li.edited');
        if(!submit_todo_valid(editTodo))
        {
            notify.removeClass('d-none')
                  .fadeIn()
                  .delay(2000)
                  .fadeOut()
            ;
        } else {
            if(todoBody.find('ul').length == 0)
            {
                todoBody.append(todoBlockUl);
                todoBody.find('.no-todo-notify-js').addClass('d-none');
                todoBody.find('ul').append(blockTodo(editTodo));
            } else {
                li.find('p').text(editTodo);
            }
            form.removeClass('form-edit-todo-js').addClass('form-add-todo-js');
        }
        form.find('input').val('');
    }

    function init_todo(e)
    {
        e.preventDefault();
        todoBody.find('ul').remove();
        todoBody.find('.no-todo-notify-js').removeClass('d-none');
    }

    /**Generer une block todo ajouter */
    function blockTodo(newTodo)
    {
        let todo ='<li class="hand">\n'+
                        '<span class="primary edit-todo-js hand">\n'+
                            '<i class="fas fa-edit"></i>\n'+
                        '</span>\n'+
                        '<p>'+newTodo+'</p>\n'+
                        '<button class="btn btn-danger delete-todo-js">&times;</button>\n'+
                  '</li>'
        ;
             
        return todo;
    }

    $(document).on('submit','.form-add-todo-js',add_todo);

    $(document).on('click','.delete-todo-js',delete_todo);
    
    $(document).on('click','.edit-todo-js',edit_todo);
    
    $(document).on('submit','.form-edit-todo-js',edited_todo);

    $(document).on('click','.init-todo-js',init_todo);
});
