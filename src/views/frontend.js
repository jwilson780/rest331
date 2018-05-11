$(function() {
  var $users = $("#userTable"); //cache dom
  var $fname = $("#firstNameInput");
  var $lname = $("#lastNameInput");
  var $email = $("#emailInput");
  var $company = $("#companyInput");
  var $phone = $("#phoneInput");
  var tableTemplate = $("#tableTemplate").html();
  //table creation
  function createTableEntryFromBackend(contact) {
    $users.append(Mustache.render(tableTemplate, contact));
  }
  //get all users in database
  $.ajax({
    type: "GET",
    url: "/contact",
    success: function(contacts) {
      $.each(contacts, function(index, contact) {
        createTableEntryFromBackend(contact);
      });
    },
    error: function() {
      alert("error loading users!");
    }
  });

  //post from to database
  $("#addContactButton").on("click", function() {
    var contact = {
      firstName: $fname.val(),
      lastName: $lname.val(),
      email: $email.val(),
      company: $company.val(),
      phone: $phone.val()
    };

    $.ajax({
      type: "POST",
      url: "/contact",
      data: contact,
      success: function(newContact) {
        createTableEntryFromBackend(newContact);
      },
      error: function() {
        alert("error saving contact");
      }
    });
  });

  //delete contact with remove button
  $users.delegate(".removeButton", "click", function() {
    var $tr = $(this).closest("tr");
    $.ajax({
      type: "DELETE",
      url: "/contact/" + $(this).attr("data-id"),
      success: function() {
        $tr.remove();
      }
    });
  });

  //logic for editbutton
  $users.delegate(".editButton", "click", function() {
    var $tr = $(this).closest("tr");
    $tr.find("input.fname").val($tr.find("span.fname").html());
    $tr.find("input.lname").val($tr.find("span.lname").html());
    $tr.find("input.email").val($tr.find("span.email").html());
    $tr.find("input.company").val($tr.find("span.company").html());
    $tr.find("input.phone").val($tr.find("span.phone").html());
    $tr.addClass("edit");
  });

  //logic for cancel button
  $users.delegate(".cancelButton", "click", function() {
    var $tr = $(this)
      .closest("tr")
      .removeClass("edit");
  });

  $users.delegate(".saveButton", "click", function() {
    var $tr = $(this).closest("tr");
    var updatedContact = {
      firstName: $tr.find("input.fname").val(),
      lastName: $tr.find("input.lname").val(),
      email: $tr.find("input.email").val(),
      company: $tr.find("input.company").val(),
      phone: $tr.find("input.phone").val()
    };

    $.ajax({
      type: "PUT",
      url: "/contact/" + $(this).attr("data-id"),
      data: updatedContact,
      success: function(updatedContact) {
        $tr.find("span.fname").html(updatedContact.firstName);
        $tr.find("span.lname").html(updatedContact.lastName);
        $tr.find("span.email").html(updatedContact.email);
        $tr.find("span.company").html(updatedContact.company);
        $tr.find("span.phone").html(updatedContact.phone);
        $tr.removeClass("edit");
      },
      error: function() {
        alert("error editing contact");
      }
    });
  });
});
