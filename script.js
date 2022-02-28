(function($){
    let app = {
        commentForm:"",
        colors:{
            brown : "#5F452B",
            gold : "#FDE14B"
        },
        func:{
            openCommantField: () => {
                let clone = $(".product-detail-tab-header [data-tab-index='4']").clone();
                $(clone).removeAttr("data-tab-index").attr("data-tab-index","5");
                $(clone).find("a").text("Değerlendirmeler")
                $(".product-detail-tab-header .row").append(clone);
                let clone2 = $(".product-detail-tab-content [data-tab-content='4']").clone();
                console.log(clone2)
                $(clone2).removeAttr("data-tab-content").attr("data-tab-content","5");
                $(clone2).find("div").remove();
                $(".product-detail-tab-content").append(clone2);
            },
            productEvaluationButtonLoad: () => {
                $(".product-compare").after(`<div class="btn product-evaluation-button w-100 bg-dark text-white" data-bs-toggle="modal" data-bs-target="#product-evaluation-button-modal">Ürünü Değerlendir</div>`)
            },
            productRatingFilterPopup: () => {
                if ($(".product-rating-filter-popup").hasClass("d-none")){
                    $(".product-rating-filter-popup").removeClass("d-none");
                }
                else{
                    $(".product-rating-filter-popup").addClass("d-none");
                }
            },
            filterPopupItem: (e) => {
                if ($(e.currentTarget).find(".form-check-input").prop("checked") === true){$(e.currentTarget).find(".form-check-input").prop('checked', false);}
                else{$(e.currentTarget).find(".form-check-input").prop('checked', true);}
            },
            productFeatureFilterPopup: () => {
                if ($(".product-feature-filter-popup").hasClass("d-none")) {$(".product-feature-filter-popup").removeClass("d-none");}
                else{$(".product-feature-filter-popup").addClass("d-none");}
            },
            featureFilterPopupItem: (e) => {
                if ($(e.target).parents(".feature-filter-popup-item").find(".form-check-input").prop("checked") == true){$(e.target).parents(".feature-filter-popup-item").find(".form-check-input")[0].checked = false}
                else{$(e.target).parents(".feature-filter-popup-item").find(".form-check-input")[0].checked = true}
            },
            sortFilterPopup: () => {
                if ($(".sort-filter-popup").hasClass("d-none")) {$(".sort-filter-popup").removeClass("d-none");}
                else{$(".sort-filter-popup").addClass("d-none");}
            },
            fastFilterItemActive: (e) => {
                if($(e.currentTarget).hasClass("fast-item-active")){
                    $(e.currentTarget).removeClass("fast-item-active");
                    $(e.currentTarget).find(".fast-filter-item-plus-icon i").removeClass().addClass("fa-solid fa-plus").css("color",app.colors.brown);
                }else{
                    $(e.currentTarget).addClass("fast-item-active");
                    $(e.currentTarget).find(".fast-filter-item-plus-icon i").removeClass().addClass("fa-solid fa-check").css("color",app.colors.brown);
                }
            },
            sortIconModalItemChoose: (e) => {
                for (const iterator of $(".sort-filter-icon-modal .sort-icon-modal-text")) {
                    if ($(iterator).hasClass("sort-icon-modal-item-active")) {
                        $(iterator).removeClass("sort-icon-modal-item-active");
                        $(iterator).find("i").remove();
                    }
                }
                if (!$(e.currentTarget).hasClass("sort-icon-modal-item-active")) {
                    $(e.currentTarget).addClass("sort-icon-modal-item-active")
                    $(e.currentTarget).append(`<i class="fa-solid fa-check"></i>`)
                }
                
            },
            sortFilterPopupItemChoose: (e) => {
                for (const iterator of $(".sort-filter-popup .sort-filter-popup-item")) {
                    if ($(iterator).hasClass("sort-filter-popup-item-active")) {
                        $(iterator).removeClass("sort-filter-popup-item-active")
                    }
                }
                $(e.currentTarget).addClass("sort-filter-popup-item-active");
            }
        },
        getForms:{
            commentForm: async () => {
               await $.ajax({
                   type: "POST", 
                   url: "https://dev.digitalfikirler.com/CommentProject/comment-form.php",
                   success: (response) => {
                       $(".product-detail-tab-content [data-tab-content='5']").append(response)
                   }
               })
            }
        }
    }

    $(document).ready(() => {
        if (window.location.href.indexOf("/urun") !== -1) {
            app.func.openCommantField();
            app.getForms.commentForm();
            app.func.productEvaluationButtonLoad();
        }
    });

    $(document).on("click",(e) => {
        if ($(e.target).parents(".product-rating-filter").length === 0 ) {
            if (!$(".product-rating-filter-popup").hasClass("d-none")) {$(".product-rating-filter-popup").addClass("d-none");}
        }
        if ($(e.target).parents(".product-feature-filter").length === 0 ) {
            if (!$(".product-feature-filter-popup").hasClass("d-none")) { $(".product-feature-filter-popup").addClass("d-none");}
        }
        if ($(e.target).parents(".sort-by-filter").length === 0 ) {
            if (!$(".sort-filter-popup").hasClass("d-none")) {$(".sort-filter-popup").addClass("d-none");}
        }
    })

    $(document).on("click",".product-rating-filter-click",() => {
        app.func.productRatingFilterPopup();
    });
    $(document).on("click",".filter-popup-item",(e) => {
        app.func.filterPopupItem(e);
    });

    $(document).on("click",".product-feature-filter-click",() => {
        app.func.productFeatureFilterPopup();
    });
    $(document).on("click",".feature-filter-popup-item",(e) => {
        app.func.featureFilterPopupItem(e);
    });

    $(document).on("click",".sort-by-filter-click",() => {
        app.func.sortFilterPopup();
    });

    $(document).on("click",".fast-filter .fast-filter-item", (e) => {
        app.func.fastFilterItemActive(e);
    })

    $(document).on("click",".sort-icon-modal-text", (e) => {
        app.func.sortIconModalItemChoose(e);
    })

    $(document).on("click",".sort-filter-popup .sort-filter-popup-item", (e) => {
       app.func.sortFilterPopupItemChoose(e);
    })
    

})(jQuery);