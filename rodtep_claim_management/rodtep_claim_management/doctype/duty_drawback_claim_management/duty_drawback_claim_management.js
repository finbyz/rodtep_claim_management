// Copyright (c) 2022, FinByz Tech Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Duty DrawBack Claim Management', {
	get_rodtep_entries:function(frm){
		if (frm.doc.rodtep_details) {
            for (var j = frm.doc.rodtap_details.length - 1; j >= 0; j--) {
                cur_frm.get_field("rodtep_details").grid.grid_rows[j].remove();
            }
        }
		frappe.call({
			method : "rodtep_claim_management.rodtep_claim_management.doctype.duty_drawback_claim_management.duty_drawback_claim_management.journal_entry_list",
			args:{
				"start_date":frm.doc.start_date,
				"end_date":frm.doc.end_date
			},
			callback: function(r) {
				
				r.message.forEach(function(res) {
					var childTable = cur_frm.add_child("rodtep_details");
					childTable.je_no = res['je_no']
					childTable.shipping_bill_no = res['shipping_bill_no']
					childTable.account = res['account']
					childTable.debit_amount = res['debit_amount']
					childTable.cheque_date = res['cheque_date']
					childTable.cheque_no = res['cheque_no']
				})
				
				cur_frm.refresh();
					
				
			}
		});
		
	},
});