<!DOCTYPE HTML>
<html>
<head>
    <title><%= indexName %></title>
</head>
<body>
    <h1>path: <%= indexName %></h1>
    <ul>
        <li><a href="../" style="font-weight:bolder">Parent Dir</a></li>
        <% fileList.forEach(function(file) { %>
        <li>
        	<% if(file.children){ %>
        		<a href="<%= file.path %>" style="color: #ee4433;"> <%= file.name %></a>
        	<% } else { %>
				<a href="<%= file.path %>"> <%= file.name %></a>
        	<% } %>

        </li>
        <% }); %>
    </ul>
</body>
</html>
