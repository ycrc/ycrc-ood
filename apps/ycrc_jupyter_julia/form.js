'use strict'

/**
 * Toggle the visibilty of a form group
 *
 * @param      {string}    form_id  The form identifier
 * @param      {boolean}   show     Whether to show or hide
 */
function toggle_visibility_of_form_group(form_id, show) {
  let form_element = $(form_id);
  let parent = form_element.parent();

  if(show) {
    parent.show();
  } else {
    form_element.val('');
    parent.hide();
  }
}

/**
 * Toggle the visibility of the jupyterlab check-box
 *
 * Looking for the value of data-has-jupyterlab
 */
function toggle_jupyterlab_switch_visibility() {
  let custom_environment_input = $('#batch_connect_session_context_custom_environment');

  // Allow for jupyter_swtich control not existing
  if ( ! ($('#batch_connect_session_context_jupyterlab_switch').length > 0) ) {
    return;
  }

  toggle_visibility_of_form_group(
    '#batch_connect_session_context_jupyterlab_switch',
    custom_environment_input.find(':selected').data('has-jupyterlab')
  );
}

/**
 * Toggle the visibility of the num_gpu select
 * 
 * Looking for the value of data-has-gpu from partition
 */
function toggle_num_gpu_visibility() {

  // return if no num_gpu
  if ( ! ($('#batch_connect_session_context_num_gpu').length > 0) ) {
    return;
  }
  let partition_input = $('#batch_connect_session_context_partitions');
  let num_gpu_input = $('#batch_connect_session_context_num_gpu');

  if ( partition_input[0].value.match("gpu") != null ){
    num_gpu_input.attr('min', 1);
    num_gpu_input.val(1);
  }
  else{
    num_gpu_input.attr('min', 0);
    num_gpu_input.val('');
  }

  toggle_visibility_of_form_group(
    '#batch_connect_session_context_num_gpu',
    partition_input.find(':selected').data('has-gpu')
  );
}

/**
 * set max hours for seleted partition
 */
function fix_num_hours() {
  if ( ! ($('#batch_connect_session_context_bc_num_hours').length > 0) ) {
    return;
  }
  let partition_input = $('#batch_connect_session_context_partitions');
  let num_hours_input = $('#batch_connect_session_context_bc_num_hours');
  
  num_hours_input.attr('max', partition_input.find(':selected').data('max-hours'));
}

/**
 *  toggle on/off additional user input options 
 */
function toggle_advanced_options_visibility() {
  // return if no advaned_options
  if ( ! ($('#batch_connect_session_context_advanced_options').length > 0) ) {
    return;
  }
  var advanced_options = document.getElementById("batch_connect_session_context_advanced_options");

  if ($('#batch_connect_session_context_bc_account').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_bc_account',
    advanced_options.checked
  ); 
  }

  if ($('#batch_connect_session_context_module_collection').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_module_collection',
    advanced_options.checked
  ); 
  }

/*
  if ($('#batch_connect_session_context_additional_modules').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_additional_modules',
    advanced_options.checked
  ); 
  }
*/

  if ($('#batch_connect_session_context_advanced_job_options').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_advanced_job_options',
    advanced_options.checked
  ); 
  }

  if ($('#batch_connect_session_context_java_opts').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_java_opts',
    advanced_options.checked
  );
  }

  if ($('#batch_connect_session_context_conda_env').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_conda_env',
    advanced_options.checked
  );
  }

  if ($('#batch_connect_session_context_glibc').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_glibc',
    advanced_options.checked
  );
  }

  if ($('#batch_connect_session_context_user_defined_envs').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_user_defined_envs',
    advanced_options.checked
  );
  }

  if ($('#batch_connect_session_context_ijulia_kernel').length > 0) {
  toggle_visibility_of_form_group(
    '#batch_connect_session_context_ijulia_kernel',
    advanced_options.checked
  );
  }
}
/**
 * Sets the change handler for the custom_environment select.
 */
function set_custom_environment_change_handler() {
  let custom_environment_input = $('#batch_connect_session_context_custom_environment');
  custom_environment_input.change(custom_environment_change_handler);
}

function set_partition_change_handler() {
  let partition_input = $('#batch_connect_session_context_partitions');
  partition_input.change(partition_change_handler);
}

function set_advanced_options_handler() {
  let advanced_input = $('#batch_connect_session_context_advanced_options');
  advanced_input.change(advanced_options_handler);
}

/**
 * Update UI when custom_environment changes
 */
function custom_environment_change_handler() {
  toggle_jupyterlab_switch_visibility();
}

function partition_change_handler() {
  toggle_num_gpu_visibility();
  fix_num_hours();
}

function advanced_options_handler() {
  toggle_advanced_options_visibility();
}


/**
 * Main
 */

// Set controls to align with the values of the last session context
toggle_jupyterlab_switch_visibility();
toggle_num_gpu_visibility();
fix_num_hours();
toggle_advanced_options_visibility();

// Install event handlers
set_custom_environment_change_handler();
set_partition_change_handler();
set_advanced_options_handler();

