<?php

class Form {
	
	// This array contains the form fields that should be included when submit the form
	// to add a new field simple add a line like the following :
	// 'Label' => 'field name',
	// the label is the label of the form item and the name is the items name in your code
	// keep in mind that the last item in the array shouldn't end with comma -> ,
	
	private $form_fields = array(
						 'Name' => 'name', 
						 'Email' => 'email', 
						 'Nationality' => 'nationality',
						 'Collection' => 'collection'
					);
	
	// This array contains the form fields that is required to check if the user filled, selected, checked or not
	// to add a new field simple add a line like the following :
	// 'Label' => 'field name',
	// the label is the label of the form item and the name is the items name in your code
	// keep in mind that the last item in the array shouldn't end with comma -> ,
	
	private $required_fields = array(
							 'Name' => 'name', 
							 'Email' => 'email',
						);
	
	// Default value is button but you may call it any other thing.
	public $Submit_button_name = "button";  
	
	private $collected_fields;
	public $errors;
	
	
	// For Processing starts here
	
	// This function collects the fields submitted from the form in case if exists and not empty
	// returns an array of fields labels and values.
	private function collect_form_fields($form_fields) {
		$collected_fields = array();
		foreach($form_fields as $label => $form_field_name) {
			if(isset($_POST[$form_field_name]) && !empty($_POST[$form_field_name])){
				// if the submitted field is an array like a group of selection boxes
				// we make sure to trim all the values of the array
				if(is_array($_POST[$form_field_name])) {
					$array_value = array();
					foreach ($_POST[$form_field_name] as $key => $value) {
						$array_value[] = trim($value);
					}
					$collected_fields[$label] = $array_value;
				// Else all the submitted items should be trimmed from front and end spaces
				} else {
					$collected_fields[$label] = trim($_POST[$form_field_name]);	
				}
			}
		}
		$this->collected_fields = $collected_fields;
	}
	
	// This function make sure that the submitted fields have the required items to process the form
	// these items are defined in the $required_fields array;
	// returns an array of errors if exist.
	private function check_form_errors($required_fields) {
		$errors = array();
		foreach($required_fields as $label => $form_field_name) {
			if(!isset($_POST[$form_field_name]) || empty($_POST[$form_field_name])) {
				$errors[$form_field_name] = "! Please Check the " . $label . " field";
			}
		}
		$this->errors = $errors;
	}
	
	// Collecting user submitted data and check for errors
	
	public function form_process() {
		$this->collect_form_fields($this->form_fields);
		$this->check_form_errors($this->required_fields);
	}
	
	
	public function user_output() {
		if(empty($this->errors)) {
			$output = "Results of the submitted form: <br />";
			foreach($this->collected_fields as $field => $value) {
				if(is_array($value)) {
					$output .=  $field . ": ";
					foreach ($value as $s_value) {
						$output .= $s_value . "<br />";
					}
				} else {
					$output .= $field . ": " . $value . "<br />";
				}
			}
		}
		return $output;
	}
}
?>