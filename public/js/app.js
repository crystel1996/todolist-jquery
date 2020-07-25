$(document).ready(function(){ 
    
    /** Notify = le block de notification si le formulaire est vide 
     * todoBody = le body de todo qui affiche la liste des todos
    */
    const notify = $('.todo-header-js').find('.todo-notify-js');
    const todoBody = $('.todo-body-js');

    /**
     * Permettre d'effectuer une file d'attente pendant la submission
     */
    function front_when_submit()
    {
        const formTodo = $('.form-add-todo-js');
        const btnSubmit = formTodo.find('button[type="submit"]');
        
        btnSubmit.children('svg').attr('class','fas fa-spin fa-spinner'); 
    }

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
        front_when_submit();
        if(!submit_todo_valid(newTodo))
        {
            notify.removeClass('d-none');
        } else {
            if(todoBody.find('ul').length == 0)
            {
                todoBody.append('<ul></ul>');
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
        if(todoBody.find('ul').children().length == 0)
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
        if(todoBody.find('ul').length == 0)
        {
            todoBody.append('<ul></ul>');
            todoBody.find('.no-todo-notify-js').addClass('d-none');
            todoBody.find('ul').append(blockTodo(editTodo));
        } else {
            li.find('p').text(editTodo);
        }
        form.find('input').val('');
        form.removeClass('form-edit-todo-js').addClass('form-add-todo-js');
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
});
