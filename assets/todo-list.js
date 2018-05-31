$(document).ready(() => {

$('form').on('submit', () => {
  let item = $('form-input');
  const todo = {item: item.val()};

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: (data) => {
        //front-end rendering based on data
        location.reload();
      }
    });

  return false;

});

  $('li').on('click', () => {
    let item = $(this).text().replace(/ /g, "-");
    $.ajax({
      type: 'DELETE',
      url: `/todo/${item}`,
      success: (data) => {
          //front-end rendering based on data
          location.reload();
      }
    });
  });


});