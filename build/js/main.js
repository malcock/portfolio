(function($){
    //Chart.Deferred.yOffset=300;
    //lets go! document.ready
    $(function(){
        
        // for(var c=0;c<charts.length;c++){
        //     var chart = charts[c];
        //     new Chart(document.getElementById(chart.id), chart.data);
            
        // }

        $(".imgzoom").on("click",function(e){
            e.preventDefault();
            var $this = $(this);

            $("#modalImg").attr("src",$this.attr("href")).attr("alt",$this.attr("alt"));
            $("#modal").addClass("modal_on");
        })

        $("#modal").on("click",function(e){
            $(this).removeClass("modal_on");
        })

        $(document).foundation();

    });


})(jQuery)