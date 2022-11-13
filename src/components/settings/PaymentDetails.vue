<template>
  <div class="container">
    <div class="page-header page-header-flex">
      <div class="pull-left">
        <h4>Payment Settings</h4>
        <p class="page-description">
          Add your company information, manage notification settings, your logo and more basic
          information for your account.

          <a
            href="https://hotelfacts.net"
            target="_blank"
            class="helpdesk-link"
            title="Open helpdesk for further information"
            >Read more
          </a>
        </p>
      </div>
    </div>
    <form action="/vendor/edit" method="POST" class="form-horizontal">
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Audit trail</label>
            <div class="col-sm-4">
              <input type="checkbox" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Audit trail</label>
            <div class="col-sm-4">
              <input type="checkbox" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Audit trail</label>
            <div class="col-sm-4">
              <input type="checkbox" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Audit trail</label>
            <div class="col-sm-4">
              <input type="checkbox" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <fieldset>
            <b-col cols="12">
              <div class="GFS-Center-Table">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <td>Audit trail</td>
                      <td>
                        <input type="checkbox" />
                        <span style="margin-left: 15px">Enable</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Add Company Logo on docs</td>
                      <td>
                        <input type="checkbox" />
                        <label style="margin-left: 15px">Enable</label>
                      </td>
                    </tr>
                    <tr>
                      <td>Partners overriding fact documents</td>
                      <td>
                        <input type="checkbox" />
                        <label style="margin-left: 15px">Enable</label>
                      </td>
                    </tr>
                    <tr>
                      <td>overriding moderation</td>
                      <td>
                        minimum / reasonable / moderate / advanced / open
                        <b-icon
                          icon="question-circle-fill"
                          scale="1.2"
                          variant="primary"
                          aria-label="Help"
                        ></b-icon>
                      </td>
                      <td>
                        <b-button>edit</b-button>
                      </td>
                    </tr>
                    <tr>
                      <td>App Theme colors</td>
                      <td>Change interface color preference</td>
                      <td>
                        <b-button @click="changeTheme()">Change</b-button>
                      </td>
                      <transition name="fade" appear>
                        <div class="modal-overlay" v-if="themeChanger">
                          <div class="modal">
                            <header class="modalheader">
                              <h5>Confirm</h5>
                            </header>
                            <fixed-plugin :color.sync="themeColor"> </fixed-plugin>
                            <b-button variant="success" @click="saveTheme()" style="float: right"
                              >confirm</b-button
                            >
                          </div>
                        </div>
                      </transition>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
            <div class="form-group row">
              <label class="control-label col-sm-2">Default Marketplace Terms</label>
              <div class="controls col-sm-3">
                <select name="defaultMarketplaceTerms.id" class="form-control form-control-sm">
                  <option value="87779" selected="selected">Standard Contract</option>
                  <option value="151945">Custom</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2">Logo</label>
              <div class="controls col-sm-3">
                <b-form-file
                  v-model="file1"
                  :state="Boolean(file1)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Selected file: {{ file1 ? file1.name : "" }}</div>
              </div>
            </div>
            <div id="logo" class="form-group row">
              <label class="control-label col-sm-2">Current Logo</label>
              <div class="controls col-sm-4">
                <p>No logo has been uploaded.</p>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2">WYSIWYG editor</label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label
                    ><input
                      type="checkbox"
                      id="useWysiwygEditor"
                      name="useWysiwygEditor"
                      value="1"
                      checked="checked"
                    />
                    Use HTML editor for product content</label
                  >
                  <input type="hidden" value="false" name="useWysiwygEditor" />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Ticket settings</legend>
            <div class="form-group voucherLogoStyle">
              <label class="col-sm-2 control-label">Logo style</label>
              <div class="controls col-sm-10">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="voucherLogoStyle"
                  name="voucherLogoStyle"
                  value=""
                  placeholder=""
                />
                <span class="help-block"> </span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2"> Show invoice ID on ticket? </label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="showInvoiceIdOnTicket"
                      name="showInvoiceIdOnTicket"
                      value="1"
                      checked="checked"
                    />
                  </label>
                  <input type="hidden" value="false" name="showInvoiceIdOnTicket" />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2"> Show booking agent on ticket </label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="showAgentDetailsOnTicket"
                      name="showAgentDetailsOnTicket"
                      value="1"
                    />
                  </label>
                  <input type="hidden" value="false" name="showAgentDetailsOnTicket" />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2"> Show payments on customer invoice </label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="showPaymentsOnInvoice"
                      name="showPaymentsOnInvoice"
                      value="1"
                    />
                  </label>
                  <input type="hidden" value="false" name="showPaymentsOnInvoice" />
                </div>
              </div>
            </div>

            <div class="form-group allowTravelerCancellation">
              <label class="col-sm-2 control-label" for="allowTravelerCancellation"
                >Traveler Cancellation</label
              >
              <div class="col-sm-10 controls">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="allowTravelerCancellation"
                      value="true"
                      name="allowTravelerCancellation"
                    />

                    <input type="hidden" value="false" name="allowTravelerCancellation" />

                    Enable online cancellations
                  </label>
                </div>
                <span class="help-block"
                  >Enabling online cancellations allows the traveler to cancel their reservations
                  from the confirmation email</span
                >
                <span class="help-block"></span>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Invoice settings</legend>
            <!-- show seller info on invoice -->
            <div class="form-group">
              <label class="control-label col-sm-2"> Show seller company info. </label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="showSellerCompanyInfo"
                      name="showSellerCompanyInfo"
                      value="1"
                      checked="checked"
                    />
                  </label>
                  <input type="hidden" value="false" name="showSellerCompanyInfo" />
                </div>
              </div>
            </div>
            <div class="form-group receiptMessage">
              <label class="col-sm-2 control-label">Message on invoice</label>
              <div class="controls col-sm-10">
                <textarea
                  class="autogrow form-control form-control-sm"
                  id="receiptMessage"
                  name="receiptMessage"
                  placeholder=""
                  rows="3"
                  style="
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: horizontal;
                    height: 74px;
                    display: none;
                  "
                ></textarea>
                <div class="note-editor note-frame panel panel-default">
                  <div class="note-dropzone"><div class="note-dropzone-message"></div></div>
                  <div class="note-toolbar panel-heading" role="toolbar">
                    <div class="note-btn-group btn-group note-style">
                      <div class="note-btn-group btn-group">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm dropdown-toggle"
                          tabindex="-1"
                          data-toggle="dropdown"
                          title=""
                          aria-label="Style"
                          data-original-title="Style"
                        >
                          <i class="note-icon-magic"></i> <span class="note-icon-caret"></span>
                        </button>
                        <ul
                          class="note-dropdown-menu dropdown-menu dropdown-style"
                          aria-label="Style"
                        >
                          <li aria-label="p">
                            <a href="#" data-value="p"><p>Normal</p></a>
                          </li>
                          <li aria-label="blockquote">
                            <a href="#" data-value="blockquote"><blockquote>Quote</blockquote></a>
                          </li>
                          <li aria-label="pre">
                            <a href="#" data-value="pre"><pre>Code</pre></a>
                          </li>
                          <li aria-label="h1">
                            <a href="#" data-value="h1"><h1>Header 1</h1></a>
                          </li>
                          <li aria-label="h2">
                            <a href="#" data-value="h2"><h2>Header 2</h2></a>
                          </li>
                          <li aria-label="h3">
                            <a href="#" data-value="h3"><h3>Header 3</h3></a>
                          </li>
                          <li aria-label="h4">
                            <a href="#" data-value="h4"><h4>Header 4</h4></a>
                          </li>
                          <li aria-label="h5">
                            <a href="#" data-value="h5"><h5>Header 5</h5></a>
                          </li>
                          <li aria-label="h6">
                            <a href="#" data-value="h6"><h6>Header 6</h6></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="note-btn-group btn-group note-style">
                      <button
                        type="button"
                        class="note-btn btn btn-default btn-sm note-btn-bold"
                        tabindex="-1"
                        title=""
                        aria-label="Bold (CTRL+B)"
                        data-original-title="Bold (CTRL+B)"
                      >
                        <i class="note-icon-bold"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm note-btn-italic"
                        tabindex="-1"
                        title=""
                        aria-label="Italic (CTRL+I)"
                        data-original-title="Italic (CTRL+I)"
                      >
                        <i class="note-icon-italic"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Remove Font Style (CTRL+\)"
                        data-original-title="Remove Font Style (CTRL+\)"
                      >
                        <i class="note-icon-eraser"></i>
                      </button>
                    </div>
                    <div class="note-btn-group btn-group note-para">
                      <button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Unordered list (CTRL+SHIFT+NUM7)"
                        data-original-title="Unordered list (CTRL+SHIFT+NUM7)"
                      >
                        <i class="note-icon-unorderedlist"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Ordered list (CTRL+SHIFT+NUM8)"
                        data-original-title="Ordered list (CTRL+SHIFT+NUM8)"
                      >
                        <i class="note-icon-orderedlist"></i>
                      </button>
                      <div class="note-btn-group btn-group">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm dropdown-toggle"
                          tabindex="-1"
                          data-toggle="dropdown"
                          title=""
                          aria-label="Paragraph"
                          data-original-title="Paragraph"
                        >
                          <i class="note-icon-align-left"></i> <span class="note-icon-caret"></span>
                        </button>
                        <ul class="note-dropdown-menu dropdown-menu">
                          <div class="note-btn-group btn-group note-align">
                            <button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Align left (CTRL+SHIFT+L)"
                              data-original-title="Align left (CTRL+SHIFT+L)"
                            >
                              <i class="note-icon-align-left"></i></button
                            ><button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Align center (CTRL+SHIFT+E)"
                              data-original-title="Align center (CTRL+SHIFT+E)"
                            >
                              <i class="note-icon-align-center"></i></button
                            ><button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Align right (CTRL+SHIFT+R)"
                              data-original-title="Align right (CTRL+SHIFT+R)"
                            >
                              <i class="note-icon-align-right"></i></button
                            ><button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Justify full (CTRL+SHIFT+J)"
                              data-original-title="Justify full (CTRL+SHIFT+J)"
                            >
                              <i class="note-icon-align-justify"></i>
                            </button>
                          </div>
                          <div class="note-btn-group btn-group note-list">
                            <button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Outdent (CTRL+[)"
                              data-original-title="Outdent (CTRL+[)"
                            >
                              <i class="note-icon-align-outdent"></i></button
                            ><button
                              type="button"
                              class="note-btn btn btn-default btn-sm"
                              tabindex="-1"
                              title=""
                              aria-label="Indent (CTRL+])"
                              data-original-title="Indent (CTRL+])"
                            >
                              <i class="note-icon-align-indent"></i>
                            </button>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <div class="note-btn-group btn-group note-table">
                      <div class="note-btn-group btn-group">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm dropdown-toggle"
                          tabindex="-1"
                          data-toggle="dropdown"
                          title=""
                          aria-label="Table"
                          data-original-title="Table"
                        >
                          <i class="note-icon-table"></i> <span class="note-icon-caret"></span>
                        </button>
                        <ul class="note-dropdown-menu dropdown-menu note-table" aria-label="Table">
                          <div class="note-dimension-picker">
                            <div
                              class="note-dimension-picker-mousecatcher"
                              data-event="insertTable"
                              data-value="1x1"
                              style="width: 10em; height: 10em"
                            ></div>
                            <div class="note-dimension-picker-highlighted"></div>
                            <div class="note-dimension-picker-unhighlighted"></div>
                          </div>
                          <div class="note-dimension-display">1 x 1</div>
                        </ul>
                      </div>
                    </div>
                    <div class="note-btn-group btn-group note-insert">
                      <button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Link (CTRL+K)"
                        data-original-title="Link (CTRL+K)"
                      >
                        <i class="note-icon-link"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Picture"
                        data-original-title="Picture"
                      >
                        <i class="note-icon-picture"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Video"
                        data-original-title="Video"
                      >
                        <i class="note-icon-video"></i>
                      </button>
                    </div>
                    <div class="note-btn-group btn-group note-view">
                      <button
                        type="button"
                        class="note-btn btn btn-default btn-sm btn-fullscreen"
                        tabindex="-1"
                        title=""
                        aria-label="Full Screen"
                        data-original-title="Full Screen"
                      >
                        <i class="note-icon-arrows-alt"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm btn-codeview"
                        tabindex="-1"
                        title=""
                        aria-label="Code View"
                        data-original-title="Code View"
                      >
                        <i class="note-icon-code"></i></button
                      ><button
                        type="button"
                        class="note-btn btn btn-default btn-sm"
                        tabindex="-1"
                        title=""
                        aria-label="Help"
                        data-original-title="Help"
                      >
                        <i class="note-icon-question"></i>
                      </button>
                    </div>
                  </div>
                  <div class="note-editing-area">
                    <div class="note-handle">
                      <div class="note-control-selection">
                        <div class="note-control-selection-bg"></div>
                        <div class="note-control-holder note-control-nw"></div>
                        <div class="note-control-holder note-control-ne"></div>
                        <div class="note-control-holder note-control-sw"></div>
                        <div class="note-control-sizing note-control-se"></div>
                        <div class="note-control-selection-info"></div>
                      </div>
                    </div>
                    <textarea class="note-codable" aria-multiline="true"></textarea>
                    <div
                      class="note-editable"
                      contenteditable="true"
                      role="textbox"
                      aria-multiline="true"
                      spellcheck="true"
                      autocorrect="true"
                    >
                      <p><br /></p>
                    </div>
                  </div>
                  <output class="note-status-output" role="status" aria-live="polite"></output>
                  <div class="note-statusbar" role="status">
                    <div class="note-resizebar" aria-label="Resize">
                      <div class="note-icon-bar"></div>
                      <div class="note-icon-bar"></div>
                      <div class="note-icon-bar"></div>
                    </div>
                  </div>
                  <div
                    class="modal note-modal link-dialog"
                    aria-hidden="false"
                    tabindex="-1"
                    role="dialog"
                    aria-label="Insert Link"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <h4 class="modal-title">Insert Link</h4>
                        </div>
                        <div class="modal-body">
                          <div class="form-group note-form-group">
                            <label for="note-dialog-link-txt-16459600449621" class="note-form-label"
                              >Text to display</label
                            ><input
                              id="note-dialog-link-txt-16459600449621"
                              class="note-link-text form-control form-control-sm note-form-control form-control-sm note-input"
                              type="text"
                            />
                          </div>
                          <div class="form-group note-form-group">
                            <label for="note-dialog-link-url-16459600449621" class="note-form-label"
                              >To what URL should this link go?</label
                            ><input
                              id="note-dialog-link-url-16459600449621"
                              class="note-link-url form-control form-control-sm note-form-control form-control-sm note-input"
                              type="text"
                              value="http://"
                            />
                          </div>
                          <div class="checkbox sn-checkbox-use-protocol">
                            <label
                              ><input type="checkbox" checked="" aria-checked="true" />Use default
                              protocol</label
                            >
                          </div>
                        </div>
                        <div class="modal-footer">
                          <input
                            type="button"
                            href="#"
                            class="btn btn-primary note-btn note-btn-primary note-link-btn"
                            value="Insert Link"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="note-popover popover in note-link-popover bottom">
                    <div class="arrow"></div>
                    <div class="popover-content note-children-container">
                      <span><a target="_blank"></a>&nbsp;</span>
                      <div class="note-btn-group btn-group note-link">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Edit"
                          data-original-title="Edit"
                        >
                          <i class="note-icon-link"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Unlink"
                          data-original-title="Unlink"
                        >
                          <i class="note-icon-chain-broken"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal note-modal"
                    aria-hidden="false"
                    tabindex="-1"
                    role="dialog"
                    aria-label="Insert Image"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <h4 class="modal-title">Insert Image</h4>
                        </div>
                        <div class="modal-body">
                          <div class="form-group note-form-group note-group-select-from-files">
                            <label
                              for="note-dialog-image-file-16459600449621"
                              class="note-form-label"
                              >Select from files</label
                            ><input
                              id="note-dialog-image-file-16459600449621"
                              class="note-image-input form-control form-control-sm-file note-form-control form-control-sm note-input"
                              type="file"
                              name="files"
                              accept="image/*"
                              multiple="multiple"
                            />
                          </div>
                          <div class="form-group note-group-image-url">
                            <label
                              for="note-dialog-image-url-16459600449621"
                              class="note-form-label"
                              >Image URL</label
                            ><input
                              id="note-dialog-image-url-16459600449621"
                              class="note-image-url form-control form-control-sm note-form-control form-control-sm note-input"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <input
                            type="button"
                            href="#"
                            class="btn btn-primary note-btn note-btn-primary note-image-btn"
                            value="Insert Image"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="note-popover popover in note-image-popover bottom">
                    <div class="arrow"></div>
                    <div class="popover-content note-children-container">
                      <div class="note-btn-group btn-group note-resize">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Resize full"
                          data-original-title="Resize full"
                        >
                          <span class="note-fontsize-10">100%</span></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Resize half"
                          data-original-title="Resize half"
                        >
                          <span class="note-fontsize-10">50%</span></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Resize quarter"
                          data-original-title="Resize quarter"
                        >
                          <span class="note-fontsize-10">25%</span></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Original size"
                          data-original-title="Original size"
                        >
                          <i class="note-icon-rollback"></i>
                        </button>
                      </div>
                      <div class="note-btn-group btn-group note-float">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Float Left"
                          data-original-title="Float Left"
                        >
                          <i class="note-icon-float-left"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Float Right"
                          data-original-title="Float Right"
                        >
                          <i class="note-icon-float-right"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Remove float"
                          data-original-title="Remove float"
                        >
                          <i class="note-icon-rollback"></i>
                        </button>
                      </div>
                      <div class="note-btn-group btn-group note-remove">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm"
                          tabindex="-1"
                          title=""
                          aria-label="Remove Image"
                          data-original-title="Remove Image"
                        >
                          <i class="note-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="note-popover popover in note-table-popover bottom">
                    <div class="arrow"></div>
                    <div class="popover-content note-children-container">
                      <div class="note-btn-group btn-group note-add">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Add row below"
                          data-original-title="Add row below"
                        >
                          <i class="note-icon-row-below"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Add row above"
                          data-original-title="Add row above"
                        >
                          <i class="note-icon-row-above"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Add column left"
                          data-original-title="Add column left"
                        >
                          <i class="note-icon-col-before"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Add column right"
                          data-original-title="Add column right"
                        >
                          <i class="note-icon-col-after"></i>
                        </button>
                      </div>
                      <div class="note-btn-group btn-group note-delete">
                        <button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Delete row"
                          data-original-title="Delete row"
                        >
                          <i class="note-icon-row-remove"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Delete column"
                          data-original-title="Delete column"
                        >
                          <i class="note-icon-col-remove"></i></button
                        ><button
                          type="button"
                          class="note-btn btn btn-default btn-sm btn-md"
                          tabindex="-1"
                          title=""
                          aria-label="Delete table"
                          data-original-title="Delete table"
                        >
                          <i class="note-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal note-modal"
                    aria-hidden="false"
                    tabindex="-1"
                    role="dialog"
                    aria-label="Insert Video"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <h4 class="modal-title">Insert Video</h4>
                        </div>
                        <div class="modal-body">
                          <div class="form-group note-form-group row-fluid">
                            <label
                              for="note-dialog-video-url-16459600449621"
                              class="note-form-label"
                              >Video URL
                              <small class="text-muted"
                                >(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)</small
                              ></label
                            ><input
                              id="note-dialog-video-url-16459600449621"
                              class="note-video-url form-control form-control-sm note-form-control form-control-sm note-input"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <input
                            type="button"
                            href="#"
                            class="btn btn-primary note-btn note-btn-primary note-video-btn"
                            value="Insert Video"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal note-modal"
                    aria-hidden="false"
                    tabindex="-1"
                    role="dialog"
                    aria-label="Help"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <h4 class="modal-title">Help</h4>
                        </div>
                        <div class="modal-body" style="max-height: 300px; overflow: scroll">
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>ENTER</kbd></label
                          ><span>Insert Paragraph</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+Z</kbd></label
                          ><span>Undoes the last command</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+Y</kbd></label
                          ><span>Redoes the last command</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>TAB</kbd></label
                          ><span>Tab</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>SHIFT+TAB</kbd></label
                          ><span>Untab</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+B</kbd></label
                          ><span>Set a bold style</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+I</kbd></label
                          ><span>Set a italic style</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+U</kbd></label
                          ><span>Set a underline style</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+S</kbd></label
                          ><span>Set a strikethrough style</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+BACKSLASH</kbd></label
                          ><span>Clean a style</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+L</kbd></label
                          ><span>Set left align</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+E</kbd></label
                          ><span>Set center align</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+R</kbd></label
                          ><span>Set right align</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+J</kbd></label
                          ><span>Set full align</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+NUM7</kbd></label
                          ><span>Toggle unordered list</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+SHIFT+NUM8</kbd></label
                          ><span>Toggle ordered list</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+LEFTBRACKET</kbd></label
                          ><span>Outdent on current paragraph</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+RIGHTBRACKET</kbd></label
                          ><span>Indent on current paragraph</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM0</kbd></label
                          ><span>Change current block's format as a paragraph(P tag)</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM1</kbd></label
                          ><span>Change current block's format as H1</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM2</kbd></label
                          ><span>Change current block's format as H2</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM3</kbd></label
                          ><span>Change current block's format as H3</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM4</kbd></label
                          ><span>Change current block's format as H4</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM5</kbd></label
                          ><span>Change current block's format as H5</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+NUM6</kbd></label
                          ><span>Change current block's format as H6</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"
                            ><kbd>CTRL+ENTER</kbd></label
                          ><span>Insert horizontal rule</span>
                          <div class="help-list-item"></div>
                          <label style="width: 180px; margin-right: 10px"><kbd>CTRL+K</kbd></label
                          ><span>Show Link Dialog</span>
                        </div>
                        <div class="modal-footer">
                          <p class="text-center">
                            <a href="http://summernote.org/" target="_blank">Summernote 0.8.14</a> ·
                            <a href="https://github.com/summernote/summernote" target="_blank"
                              >Project</a
                            >
                            ·
                            <a
                              href="https://github.com/summernote/summernote/issues"
                              target="_blank"
                              >Issues</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="help-block"></span>
                <span class="help-block"></span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2"> Currency exchange rates provider </label>
              <div class="controls col-sm-10">
                <select
                  name="currencyProviderId"
                  id="currencyProviderId"
                  class="form-control form-control-sm"
                  style="margin-top: 10px"
                >
                  <option value="bokun.io" selected="selected">Default (Icelandic banks)</option>

                  <option value="openexchangerates.org">OpenExchangeRates.org</option>
                </select>
              </div>
            </div>
          </fieldset>
          <fieldset class="notifications-container">
            <legend>Notifications</legend>

            <div class="form-group">
              <label class="control-label col-sm-2">E-mail addresses for notifications</label>
              <div class="controls col-sm-10">
                <select
                  id="bookingNotificationAddresses"
                  class="form-control form-control-sm select2-hidden-accessible"
                  multiple=""
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="hamada_7777@hotmail.com" selected="selected">
                    hamada_7777@hotmail.com
                  </option>

                  <option value="info@royalsafari.net" selected="selected">
                    info@royalsafari.net
                  </option>

                  <option value="booking@royalsafari.net" selected="selected">
                    booking@royalsafari.net
                  </option></select
                ><span
                  class="select2 select2-container select2-container--default"
                  dir="ltr"
                  style="width: 1155px"
                  ><span class="selection"
                    ><span
                      class="select2-selection select2-selection--multiple"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabindex="-1"
                      ><ul class="select2-selection__rendered">
                        <li class="select2-selection__choice" title="hamada_7777@hotmail.com">
                          <span class="select2-selection__choice__remove" role="presentation"
                            >×</span
                          >hamada_7777@hotmail.com
                        </li>
                        <li class="select2-selection__choice" title="info@royalsafari.net">
                          <span class="select2-selection__choice__remove" role="presentation"
                            >×</span
                          >info@royalsafari.net
                        </li>
                        <li class="select2-selection__choice" title="booking@royalsafari.net">
                          <span class="select2-selection__choice__remove" role="presentation"
                            >×</span
                          >booking@royalsafari.net
                        </li>
                        <li class="select2-search select2-search--inline">
                          <input
                            class="select2-search__field"
                            type="search"
                            tabindex="0"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            role="textbox"
                            aria-autocomplete="list"
                            placeholder=""
                            style="width: 0.75em"
                          />
                        </li></ul></span></span
                  ><span class="dropdown-wrapper" aria-hidden="true"></span
                ></span>
                <input
                  type="hidden"
                  id="bookingNotificationAddresses-value"
                  name="bookingNotificationAddresses"
                  value="hamada_7777@hotmail.com,info@royalsafari.net,booking@royalsafari.net"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2">Booking notifications</label>
              <div class="controls col-sm-10">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="onlyNotifyOnExternalBookings"
                      name="onlyNotifyOnExternalBookings"
                      value="1"
                      checked="checked"
                    />
                    No notifications when we create/change bookings ourselves
                  </label>
                  <input type="hidden" value="false" name="onlyNotifyOnExternalBookings" />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Mail settings</legend>
            <p>
              These settings are used when sending emails to customers (booking confirmations,
              etc.).
            </p>

            <div class="form-group fromEmail">
              <label class="col-sm-2 control-label">Sender email *</label>
              <div class="controls col-sm-10">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="fromEmail"
                  name="fromEmail"
                  value="info@royalsafari.net"
                  placeholder=""
                  required="required"
                  data-validate="true"
                  data-required="true"
                  data-missing-msg="Required"
                />
                <span class="help-block"> </span>
              </div>
            </div>
            <div class="form-group fromName">
              <label class="col-sm-2 control-label">Sender name *</label>
              <div class="controls col-sm-10">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="fromName"
                  name="fromName"
                  value="Royal Safari"
                  placeholder=""
                  required="required"
                  data-validate="true"
                  data-required="true"
                  data-missing-msg="Required"
                />
                <span class="help-block"> </span>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2">Mailchimp API key</label>
              <div class="controls col-sm-10">
                <input
                  type="text"
                  id="mailchimpApiKey"
                  class="form-control form-control-sm"
                  name="mailchimpApiKey"
                  value=""
                  data-original=""
                />
                <button
                  type="button"
                  class="btn btn-default disabled"
                  id="mailchimp-btn"
                  disabled="disabled"
                >
                  Load
                </button>
                <br />
                <select
                  name="mailchimpDefaultListId"
                  id="mailchimpDefaultListId"
                  class="form-control form-control-sm"
                  style="margin-top: 10px"
                ></select>
              </div>
            </div>
            <div id="mandrillOption" class="hidden">
              <div class="form-group">
                <label class="control-label col-sm-2">Mandrill account</label>
                <div class="controls col-sm-10">
                  <div class="checkbox">
                    <label
                      ><input type="checkbox" id="useMandrill" name="useMandrill" value="true" />
                      Use my own Mandrill account (must have an API key!)</label
                    >
                    <input type="hidden" value="false" name="useMandrill" />
                  </div>
                </div>
              </div>

              <div class="form-group mandrillApiKey">
                <label class="col-sm-2 control-label">Mandrill API key</label>
                <div class="controls col-sm-10">
                  <input
                    type="text"
                    class="form-control form-control-sm disabled"
                    id="mandrillApiKey"
                    name="mandrillApiKey"
                    value=""
                    placeholder=""
                    disabled="disabled"
                  />
                  <span class="help-block"> </span>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Barcode settings</legend>
            <p>These settings are used when assigning barcodes to bookings</p>

            <div class="form-group">
              <label class="control-label col-sm-2">Barcode format</label>
              <div class="controls col-sm-10">
                <select name="barcodeFormat" class="form-control form-control-sm">
                  <option value="QR_CODE" selected="selected">QR code</option>

                  <option value="CODE_128">Code 128</option>

                  <option value="PDF_417">PDF417</option>

                  <option value="DATA_MATRIX">Data Matrix</option>

                  <option value="AZTEC">Aztec</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Product distribution settings</legend>
            <p>
              These will be the default distribution settings unless they are overwritten elsewhere.
            </p>

            <div class="form-group">
              <label class="control-label col-sm-2">Booking Agents</label>
              <div class="controls col-sm-10">
                <select name="bookingAgentDistribution.id" class="form-control form-control-sm">
                  <option value="">None</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Audit trail settings</legend>
            <p>These settings pertain to collected audit trail data</p>
            <div class="form-group">
              <label class="control-label col-sm-2">Record retention period (months)</label>
              <div class="controls col-sm-10">
                <input
                  type="number"
                  step="1"
                  min="0"
                  class="form-control form-control-sm input-mini"
                  name="auditTrailRetention"
                  value="12"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <input type="hidden" name="id" value="30658" />

            <input type="hidden" id="parentVendor_id" name="parentVendor.id" value="" />
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </fieldset>
        </b-col>
      </b-row>
    </form>

    <div class="modal fade" id="translationsDeleteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>Delete translation language</h3>
          </div>
          <div class="modal-body">
            <p>Are you absolutely sure? This cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn btn-danger" id="translationsDeleteBtn">Yes</a>
            <a href="#" class="btn btn-default" data-dismiss="modal">No</a>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden-print">
      <footer>
        <hr />

        <p class="poweredBy" style="text-align: center">
          Powered by
          <a class="not-searchable" href="https://hotelfacts.net">
            <img src="/src/assets/logo.png" style="vertical-align: bottom; height: 35px" />
          </a>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      themeChanger: false,
    };
  },
};
</script>
